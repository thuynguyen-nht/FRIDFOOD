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
        UserId: params.id
      }
    }).then(function(data) {
      console.log(data);
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
