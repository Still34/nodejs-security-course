const models = require('../models')
const Sequelize = require('sequelize')
const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => { res.render('login') })
router.post('/', urlencodedParser, (req, res) => {
  // models.User.findOne({ where: { username: req.body.username } })
  //   .then((user) => {
  //     if (!user) {
  //       res.render('login', { failure: true, message: 'User not found.' })
  //     } else {
  //       bcrypt.compare(req.body.password, user.password, (_, result) => {
  //         if (result === true) {
  //           res.render('login', { failure: false, message: '' })
  //         } else {
  //           res.render('login', { failure: true, message: 'Incorrect password.' })
  //         }
  //       })
  //     }
  //   }).catch((err) => {
  //     res.render('login', { failure: true, message: err.message })
  //   })
  models.sequelize.query(`select * from Users where username = '${req.body.username}'`, { type: Sequelize.QueryTypes.SELECT })
    .then((users) => {
      const user = users[0]
      if (!user) {
        res.render('login', { failure: true, message: 'User not found.' })
      } else {
        bcrypt.compare(req.body.password, user.password, (_, result) => {
          if (result === true) {
            res.render('login', { failure: false, message: '' })
          } else {
            res.render('login', { failure: true, message: 'Incorrect password.' })
          }
        })
      }
    }).catch((err) => {
      res.render('login', { failure: true, message: err.message })
    })
})

module.exports = router
