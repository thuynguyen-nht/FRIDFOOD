var db = require("../models");
var axios = require("axios");
require("dotenv").config();

module.exports = function(app) {
  app.post("/api/ingredient/:id", function(req, res) {
    var id = req.params.id;
    db.Fridge.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(data) {
      if (data[0] !== undefined) {
        var x = data[0];
        var newDataID = x.dataValues.UserId;
        var dbData = x.dataValues.ingredientName;
        var dbArr = dbData.split(",");
        var newIngredient = req.body.newIngredient;

        var newData = newIngredient + "," + dbData;
        if (dbArr.includes(newIngredient)) {
          newData = dbData;
        }
        db.Fridge.update(
          {
            ingredientName: newData
          },
          {
            where: { UserId: newDataID }
          }
        ).finally(function() {
          db.Fridge.findAll({
            where: {
              UserId: id
            }
          })
            .then(function(result) {
              var inventory = result[0];
              var inventoryArr = inventory.dataValues.ingredientName.split(",");
              var objArr = [];
              for (i in inventoryArr) {
                if (inventoryArr[i] !== "") {
                  var obj = {
                    ingredient: inventoryArr[i]
                  };
                  objArr.push(obj);
                }
              }
              return objArr;
            })
            .then(function(obj) {
              res.send(obj);
            });
        });
      } else {
        var newIngredient = req.body.newIngredient;
        var newData = newIngredient;
        db.Fridge.update(
          {
            ingredientName: newData
          },
          {
            where: { UserId: newDataID }
          }
        ).finally(function() {
          db.Fridge.findAll({
            where: {
              UserId: id
            }
          })
            .then(function(result) {
              var inventory = result[0];
              var inventoryArr = inventory.dataValues.ingredientName.split(",");
              var objArr = [];
              for (i in inventoryArr) {
                if (inventoryArr[i] !== "") {
                  var obj = {
                    ingredient: inventoryArr[i]
                  };
                  objArr.push(obj);
                }
              }
              return objArr;
            })
            .then(function(obj) {
              res.send(obj);
            });
        });
      }
    });
  });
  app.post("/api/recipes/:id", function(req, res) {
    db.Fridge.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(response) {
      var data = response[0];

      var searchItems = data.dataValues.ingredientName;
      axios({
        method: "GET",
        url: "https://api.spoonacular.com/recipes/findByIngredients",
        params: {
          number: 6,
          apiKey: process.env.SPOON_APIKEY,
          ingredients: searchItems
        }
      })
        .then(spoonData => {
          res.send(spoonData.data);
        })
        .catch(error => {
          console.log(error);
        });
    });
  });
};
