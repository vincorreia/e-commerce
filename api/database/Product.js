const Sequelize = require("sequelize");
const db = require("./database");

const Product = db.define('product', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return this.getDataValue("tags").split(";")
        },
        set(val) {
            this.setDataValue("tags", val.join(";"));
        }
    },
    description: { 
        type: Sequelize.STRING
    }
});

module.exports = Product;