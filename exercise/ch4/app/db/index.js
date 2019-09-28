module.exports = () => {
    console.log('Initializing sequelize...')
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
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}