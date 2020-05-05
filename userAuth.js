require("dotenv").config();

var firebase = require("firebase/app");
require("firebase/auth");

var app = firebase.initializeApp({
  apiKey: "AIzaSyBFgVUzb0VsQHwakn-BsRhkbkh5aGuBQc8",
  authDomain: "fridfood-d54a0.firebaseapp.com",
  databaseURL: "https://fridfood-d54a0.firebaseio.com",
  projectId: "fridfood-d54a0",
  storageBucket: "fridfood-d54a0.appspot.com",
  messagingSenderId: "239576997659",
  appId: "1:239576997659:web:fd7cc20793ce4746bb7dbe"
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
  app
    .auth()
    .createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then(function(result) {
      console.log(result.user.uid);
      return result.user.id;
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.code);
    });
}

// Will need to trigger this when a user has submitted their login information and will need to pull the email and password fields
function login(loginEmail, loginPassword) {
  app
    .auth()
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(function(result) {
      console.log(result.user.uid);
      return result.user.id;
    })
    .catch(function(error) {
      // Handle Errors here.
      console.log(error.message);
      return error.message;
    });
}

module.exports = {
  login: login,
  signUp: signUp
};
