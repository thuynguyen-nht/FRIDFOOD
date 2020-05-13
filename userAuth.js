require("dotenv").config();

var firebase = require("firebase/app");
require("firebase/auth");

// var app = firebase.initializeApp({
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: process.env.FIREBASE_AUTHDOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASEURL,
//   projectId: process.env.FIREBASE_PROJECTID,
//   storageBucket: process.env.FIREBASE_STORAGEBUCKER,
//   messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.FIREBASE_APPID
// });

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
  return app
    .auth()
    .createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then(function(result) {
      // console.log(result.user.uid);
      return result.user.uid;
    })
    .catch(function(error) {
      // Handle Errors here.
      // console.log(error.code);

      if (
        error.code === "auth/email-already-in-use" ||
        error.code === "auth/invalid-email"
      ) {
        return { type: "email", message: error.message };
      } else {
        return { type: "password", message: error.message };
      }
      // console.log(error.code);
      // console.log(error.message);
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
      // Handle Errors here

      //If there is an error return an json object with type and error message parameter
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        return { type: "email", message: error.message };
      } else {
        return { type: "password", message: error.message };
      }
      // console.log(error.code);
      // console.log(error.message);
    });
}

function logOut() {
  return app
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      console.log("User sign out successfully");
    })
    .catch(function(error) {
      // An error happened.
      console.log(error.message);
    });
}

module.exports = {
  login: login,
  signUp: signUp,
  logOut: logOut
};
