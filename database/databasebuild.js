var db = require("../models");
var recipe = db.recipe;
var ingredient = db.ingredient;

var tableFiller = function (recipe1, ingredientArr) {
  recipe.findOrCreate({
    where: {
      name: recipe1.name,
    },
    defaults: {
      recipeText: recipe1.text,
      spoonacularID: recipe1.spoonID,
      imageLink: recipe1.img
    }
  }).spread((newRecipe, created) => {
    var recipes = newRecipe;
    return recipes;
  }).then(recipes => {
    // add for loop to go through ingredients array and add each ingredient 
    async function processIngredients (array) {
      for (const item of array) {
        console.log(item);
        await ingredientTransaction(item, recipes);
      }
      console.log("Done!");
    }
    processIngredients(ingredientArr);
    return recipes;
  });
}

var ingredientTransaction = function(ingredient1, recipes) {
  ingredient.findOrCreate({
    where: {
      name: ingredient1.name
    },
    defaults: {
      spoonacularID: ingredient1.spoonID,
      imageLink: ingredient1.img
    }
  }).spread((newIngredient, created) => {
    var newIngredientID = newIngredient.get({
      plain: true
    }).id;
    var newIngredientArray = [newIngredient, newIngredientID, created];
    return newIngredientArray;
  }).spread((newIngredient, newIngredientID, createdI) => {
    newIngredient.addRecipes(recipes, {
      through: {
        amount: ingredient1.amount,
        unit: ingredient1.unit
      }
    });
  });
}


module.exports = tableFiller, ingredientTransaction;