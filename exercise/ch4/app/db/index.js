var db = {};
console.log('Initializing sequelize...');
const databaseName = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(databaseName, username, password, {
    host: 'ch4_db_1',
    port: 3306,
    dialect: 'mariadb',
    pool: {
        max: 5
    }
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        const userTable = sequelize.define('employee', {
            username: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                }
            },
            // never store password next to the username
            // we are only doing this as a practice
            password: {
                type: Sequelize.STRING
            }
        });
        userTable.sync();
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
