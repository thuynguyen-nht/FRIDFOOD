var userAuth = require("./userAuth.js");

// describe("User Login", function() {
//   it("should return a the valid user id", () => {
//     var email = "test@test.com";
//     var password = "123456";

//     return userAuth.login(email, password).then(result => {
//       assert.equal(result, "o5fwjuFPImSKofqQOzqp5D1BTFh1");
//     });
//   });
// });

console.log(userAuth.login("test@test.com", "123456"));
