var db = require("../models");
require("dotenv");

module.exports = function(app) {
  app.post("/api/ingredient/:id", function(req, res) {
    console.log("req body>>", req.body);
    var id = req.params.id;
    db.Fridge.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(data) {
      console.log(data);
      var x = data[0];
      var newDataID = x.dataValues.UserId;
      console.log(newDataID);
      var dbData = x.dataValues.ingredientName;
      console.log("data from DB>>", dbData);
      var newIngredient = req.body.newIngredient;
      console.log("new ingredient>>", newIngredient);
      var newData = newIngredient + "," + dbData;
      console.log("newData>>", newData);
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
            console.log(inventoryArr);
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
    });
  });
  app.post("/api/recipes/:id", function(req, res) {
    console.log("req params is:--->", req.params.id);
    db.Fridge.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(response) {
      var data = response[0];

      var searchItems = data.dataValues.ingredientName;
      console.log(searchItems);
      res.send(searchItems);
    });
  });

  // app.get("/api/ingredients/:id", function(req, res) {
  //   console.log(req.body);
  //   db.Fridge.findAll({
  //     where: {
  //       UserId: req.body.UserId
  //     }
  //   }).then(function(response) {
  //     console.log(response);
  //     var Arr = response.split(",");
  //     res.send(Arr);
  //   });
  // });
};
