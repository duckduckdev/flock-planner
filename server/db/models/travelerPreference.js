const db = require('../db')
const Sequelize = require('sequelize')

const TravelerPreference = db.define('traveler-preference', {
  firstLocation: {
    type: Sequelize.STRING
  },

  secondLocation: {
    type: Sequelize.STRING
  },

  thirdLocation: {
    type: Sequelize.STRING
  },
  firstDates: {
    type: Sequelize.STRING
  },
  secondDates: {
    type: Sequelize.STRING
  },
  thirdDates: {
    type: Sequelize.STRING
  },
  budget: {
    type: Sequelize.INTEGER
  }
})

module.exports = TravelerPreference
