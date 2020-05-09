module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit: DataTypes.INTEGER
  });
  return Ingredient;
};
