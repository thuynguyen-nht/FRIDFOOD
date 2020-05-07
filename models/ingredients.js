module.exports = function (sequelize,DataTypes){
    const Ingredient = sequelize.define("ingredients", {
        name: DataTypes.STRING,
        spoonacularID:DataTypes.INTEGER,
        imageLink: DataTypes.STRING
    });
    return Ingredient;
};