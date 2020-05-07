var db = require("../models");
var Sequelize = require("sequelize");
// op is a symbols for "where" option that is used to filter the query
var Op = Sequelize.Op;
var databaseFill = require("../database/databasebuild");
module.exports = function(app) {
  //this is to get all ingredients
  app.get("/api/ingredients", function(req, res) {
    db.Example.findAll({}).then(function(ingredients) {
      res.json(ingredients);
    });
  });

  // Create a new recipe
  app.post("/api/new-recipe", function(req, res) {
    var recipe = JSON.parse(req.body.recipe);
    var ingredientsArray = JSON.parse(req.body.ingredients);
    //  PROMISE lets asynchronous methods return values like synchronous methods: instead of immediately
    // returning the final value, the asynchronous method returns a promise to supply the value at some point in the future
    var databasePromise = new Promise(function(resolve,reject) {
      resolve(databaseFill(recipe, ingredientsArray));
    });
    databasePromise.then(function(newRecipe) {
      res.json(newRecipe);
    });
  });
  //using selected ingredients, find all recipes that contain at least one or any selected ingredients
  app.post("/api/search/", function(req, res) {
    console.log(req.body);
    var foo = JSON.parse(req.body.hello);
    console.log(foo);

    db.recipe
      .findAll({
        include: [
          {
            model: db.ingredient,
            as: "Ingredients",
            where: { id: { [Op.in]: foo } }
          }
        ]
      })
      .then(function(returnedRecipes) {
        console.log(returnedRecipes);
        res.json(returnedRecipes);
      });
  });

  app.post("/api/ingrSearch", function(req, res) {
    db.ingredient
      .findAll({
        include: [
          {
            model: db.recipe,
            as: "Recipes",
            where: { id: req.body.recipe }
          }
        ]
      })
      .then(function(returnedRecipes) {
        console.log(returnedRecipes);
        res.json(returnedRecipes);
      });
  });

  app.post("/api/unitAmount", function(req, res) {
    var iArr = JSON.parse(req.body.ingredientsID);
    db.recipeIngredient
      .findAll({
        where: {
          recipeId: req.body.recipeID,
          ingredientId: { [Op.in]: iArr }
        }
      })
      .then(function(returnedRecipes) {
        console.log(returnedRecipes);
        res.json(returnedRecipes);
      });
  });
};
