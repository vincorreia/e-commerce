const Product = require("./Product")
const Purchase = require("./Purchase")
const Review = require("./Review")
const User = require("./User")

// TODO :
// User - Has many Reviews & Has many Purchase
// Reviews - Belongs to User & Product
// Purchase belongs to User & Has many Product
// Product has many Reviews & belongs to many User through Purchase

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Purchase.hasMany(Product);
Product.belongsToMany(User, {through: Purchase})

module.exports = {
    Product,
    Purchase,
    Review,
    User
}