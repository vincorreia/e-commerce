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
        allowNull: true
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "John Doe"
    }

})

module.exports = Review