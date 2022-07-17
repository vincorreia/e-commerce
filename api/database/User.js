const Sequelize = require("sequelize");
const db = require("./database")

const User = db.define('user', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "John Doe"
    }
});

module.exports = User