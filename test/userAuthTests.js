var expect = require("chai").expect;
var userAuth = require("../userAuth.js");

describe("User Login", function() {
  it("should return a the valid user id", function() {
    var email = "test@test.com";
    var password = "123456";
    expect(userAuth.login(email, password)).to.equal(
      "o5fwjuFPImSKofqQOzqp5D1BTFh1"
    );
  });
});
