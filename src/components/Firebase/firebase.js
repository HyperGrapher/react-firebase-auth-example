import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// This class instantiated only once using react context api in the root index.js
// and its methods are available to all components using Context Provider
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  // *** Auth API ***
  // define all the authentication functions as class methods.
  // They will act as communication channel to the Firebase API.

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Login

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Signout - No argument needed. Firebase knows the authanticated user.
  doSignOut = () => {
    console.log("Sign Out Called!");
    this.auth.signOut();
  };

  // reset and change password
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
