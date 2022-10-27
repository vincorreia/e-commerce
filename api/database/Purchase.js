const Sequelize = require("sequelize")
const db = require("./database")

const Purchase = db.define("purchase", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    items: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue("items").split(";").map(item => JSON.parse(item))
        },
        set(val) {
            this.setDataValue("items", val.join(";"));
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Purchase;