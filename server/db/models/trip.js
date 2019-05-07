const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  finalDestination: {
    type: Sequelize.STRING
  },
  finalDates: {
    type: Sequelize.STRING
  },
  booked: {
    type: Sequelize.BOOLEAN,
    default: false
  }
})

module.exports = Trip
