var path= require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    app.get("/", function(req, res) {
      res.sendFile(path.join(_dirname, "../public/index.html"));
    });
    //Load search page
    app.get("/search", function(req, res) {
      res.sendFile(path.join(_dirname, "../public/search.html"));
    });
    //
    app.get("/recipes", function(req, res) {
      res.sendFile(path.join(_dirname, "../public/recipes.html"));
    });

// Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };
