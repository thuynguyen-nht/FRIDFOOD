// dependencies
var mysql = require("mysql");
var Sequelize = require("sequelize");
var sequelize = new Sequelize("fridgeSearch", "root", "password", {
  host: "localhost",
  dialect: "mysql"
});
// connection that we can export to other files
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "fridgeSearch"
  });
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

//   exporting connection
module.exports = connection;
