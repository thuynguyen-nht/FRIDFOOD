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
        }).then(function() {
          res.send(result);
        });
      }
    });
  });

  app.get("/api/logOut", function(req, res) {
    //req stuff
    console.log(req.query);
    userAuth.logOut().then(function(result) {
      console.log("User signed out");
      // console.log(result);
      res.send(result);
    });
  });
};
