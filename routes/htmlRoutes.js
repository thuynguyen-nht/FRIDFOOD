var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load main page after log in and pass the id to url
  app.get("/main", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("mainPage", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load main page after log in and pass the id to url
  app.get("/fridge", function(req, res) {
    db.User.findAll({}).then(function(dbExamples) {
      res.render("myFridge", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
