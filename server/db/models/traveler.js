const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Traveler = db.define('traveler', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = Traveler

/**
 * instanceMethods
 */
Traveler.prototype.correctPassword = function(candidatePwd) {
  return Traveler.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Traveler.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Traveler.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = Traveler.generateSalt()
    user.password = Traveler.encryptPassword(user.password(), user.salt())
  }
}

Traveler.beforeCreate(setSaltAndPassword)
Traveler.beforeUpdate(setSaltAndPassword)
Traveler.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
