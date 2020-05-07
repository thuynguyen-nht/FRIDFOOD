module.exports = function (sequelize, DataTypes) {
    const RecipeIngredient = sequelize.define("recipe_ingredient", {
      amount: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      recipeId: DataTypes.INTEGER,
      ingredientId: DataTypes.INTEGER
    });
    return RecipeIngredient;
  };