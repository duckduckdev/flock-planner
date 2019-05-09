const express = require('express')
const router = express.Router()
const {Trip} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const newTrip = await Trip.create({
      name: req.body.name
    })
    await newTrip.addTraveler(req.user.id)

    res.send(newTrip)
  } catch (error) {
    next(error)
  }
})
