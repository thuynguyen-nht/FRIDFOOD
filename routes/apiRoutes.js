var db = require("../models");
var userAuth = require("../userAuth");
require("dotenv");

module.exports = function(app) {
  // Get all info based on logged in user
  app.get("/api/user", function(req, res) {
    //req stuff
    console.log(req.query);
    userAuth
      .login(req.query.loginEmail, req.query.loginPassword)
      .then(function(result) {
        if (typeof result === "object") {
          res.json(result);
        } else {
          res.send(result);
        }
      });
    // once you get unique ID from firebase, query DB to get all info where userID is that uniqe id, but it will be placed in DB by sign up function
    // db.User.findall({
    //   where: {
    //     UserId: res
    //   }
    // }).then(function(result) {
    //   console.log(result);
    // });
  });

  // Create a new user
  app.post("/api/user", function(req, res) {
    userAuth.signUp(req.body.email, req.body.password).then(function(result) {
      if (typeof result === "object") {
        res.json(result);
      } else {
        db.User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          UserId: result
        })
          // make new ingredient row with new User ID from new User
          .then(function(data) {
            console.log("Your data is: ", data);
            var userData = data;
            console.log("Data values: " + userData.dataValues.UserId);
            db.Ingredient.create({
              UserId: userData.dataValues.UserId,
              ingredientCountUnit: ""
            });
          })
          .then(function() {
            res.send(result);
          });
      }
    });
  });

  // udpate ingredient
  app.post("/api/ingredient/:id", function(req, res) {
    console.log(JSON.stringify(req.body));
    db.Ingredient.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function(data) {
      console.log("User to update is: ", data[0]);
      var updateData = data[0];
      console.log(updateData.dataValues.UserId);
      console.log(updateData.dataValues.ingredientCountUnit);
      var newDataId = updateData.dataValues.UserId;
      if (newDataId) {
        // need to get this to add to cell, not overwite it with every new ingredient
        var existingData = updateData.ingredientCountUnit;
        var newData = [
          existingData,
          req.body.newIngredient,
          req.body.quantity,
          req.body.unit
        ];
        var updateThis = [];
        console.log("Data to be added: ", newData);
        //getting all the new data and putting into an array to put into DB
        for (var i in newData) {
          // making sure we do not add the empty string from initial table value upon creation to the updated values
          if (newData[i].length >= 1) {
            updateThis.push(newData[i]);
          }
        }
        console.log(updateThis);
        db.Ingredient.update(
          {
            // using the Pipe so we can parse later?
            ingredientCountUnit: updateThis.toString() + "|"
          },
          {
            where: { UserId: newDataId }
          }
        ).then(function(result) {
          console.log("Rows upDated: " + result);
          res.send(result);
          // then we need to reference reload?refresh?update DOM
        });
      }
    });
  });
};

// Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.json(dbExample);
//   });
// });
