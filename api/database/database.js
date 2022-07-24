const Sequelize = require("sequelize")
require("dotenv").config();

const sequelize = new Sequelize('landing-page', 'root', "1234",{
    dialect: 'mysql',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3306
})

module.exports = sequelize;