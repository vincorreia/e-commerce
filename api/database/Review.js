const Sequelize = require("sequelize")
const db = require("./database")

const Review = db.define("review", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Review