const models = require('../models')
const express = require('express')
var Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => { res.render('register') })
router.post('/', urlencodedParser, (req, res) => {
  const userMatches = models.User.findAll({
    where: Sequelize.or(
      { username: req.body.username },
      { email: req.body.email })
  })
  userMatches.then((users) => {
    if (users.length === 0) {
      const passwordHash = bcrypt.hashSync(req.body.password, 10)
      models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash
      }).then(() => {
        res.render('register', { failure: false, message: `User ${req.body.username} created.` })
      }).catch((err) => {
        res.render('register', { failure: true, message: err.message || 'Generic error' })
      })
    } else {
      res.render('register', { failure: true, message: 'This username or email had already been used.' })
    }
  })
})

module.exports = router
