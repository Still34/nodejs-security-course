'use strict'
const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const basename = path.basename(__filename)
const db = {}

const databaseName = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const sequelize = new Sequelize(databaseName, username, password, {
  host: process.env.DB_CONTAINER_NAME,
  port: 3306,
  dialect: 'mariadb',
  pool: {
    max: 5
  }
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
    process.exit()
  })

sequelize.sync()
  .catch(err => {
    console.error('Failed to synchronize database:', err)
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
