module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    UserId: DataTypes.STRING,
    ingredientCountUnit: DataTypes.STRING
  });
  return Ingredient;
};
