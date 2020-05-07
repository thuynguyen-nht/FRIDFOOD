"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var allConfig = require(__dirname + "/../config/config.json");
console.log(allConfig)
var config = require(__dirname + "/../config/config.json")[env];
var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.recipe = require("../models/recipe.js")(sequelize, Sequelize);
db.ingredient = require("../models/ingredients.js")(sequelize, Sequelize);
db.recipeIngredient = require("../models/recipeingredient.js")(sequelize, Sequelize);

db.recipe.belongsToMany(db.ingredient, {as: "Ingredients", through: "recipe_ingredient"});
db.ingredient.belongsToMany(db.recipe, {as: "Recipes", through: "recipe_ingredient"});
module.exports = db;
