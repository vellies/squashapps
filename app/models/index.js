const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.foods = require("./food.model.js")(mongoose);
db.ingredients = require("./ingredients.model.js")(mongoose);
db.orders = require("./order.model.js")(mongoose);

module.exports = db;