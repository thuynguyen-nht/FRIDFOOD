require("dotenv").config();

var firebase = require("firebase/app");
require("firebase/auth");

var app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: process.env.FIREBASE_STORAGEBUCKER,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_APPID
});

// app.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     console.log(user.uid);
//   } else {
//     // No user is signed in.
//     console.log("Not signed in");
//   }
// });

function signUp(signupEmail, signupPassword) {
  return app
    .auth()
    .createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then(function(result) {
      console.log(result.user.uid);
      return result.user.uid;
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
    });
}

// Will need to trigger this when a user has submitted their login information and will need to pull the email and password fields
function login(loginEmail, loginPassword) {
  return app
    .auth()
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(function(result) {
      console.log(result.user.uid);
      return result.user.uid;
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.message);

      //If there is an error return an json object with type and error message parameter
      return error.message;
    });
}

module.exports = {
  login: login,
  signUp: signUp
};
