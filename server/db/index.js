const db = require('./db')

// register models
require('./models')
require('../firebaseDB/firebaseDB')

module.exports = db
