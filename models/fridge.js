module.exports = function(sequelize, DataTypes) {
  var Fridge = sequelize.define("Fridge", {
    UserId: DataTypes.STRING,
    ingredientName: DataTypes.TEXT
  });
  return Fridge;
};
