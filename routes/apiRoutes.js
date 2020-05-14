var db = require("../models");
var userAuth = require("../userAuth");
require("dotenv");

module.exports = function(app) {
  // Get all info based on logged in user
  app.get("/api/user", function(req, res) {
    //req stuff
    userAuth
      .login(req.query.loginEmail, req.query.loginPassword)
      .then(function(result) {
        if (typeof result === "object") {
          res.json(result);
        } else {
          res.send(result);
        }
      });
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
            var userData = data;
            db.Fridge.create({
              UserId: userData.dataValues.UserId,
              ingredientName: ""
            });
          })
          .then(function() {
            res.send(result);
          });
      }
    });
  });

  app.get("/api/logOut", function(req, res) {
    //req stuff
    userAuth.logOut().then(function(result) {
      res.send(result);
    });
  });
};
