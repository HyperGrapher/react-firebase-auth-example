import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Login from "../components/Login";
import SignUpPage from "../components/SignUp";
import Home from "../components/Home";
import Navigation from "../components/Navigation";
import Blog from "../components/Blog";
import { withFirebase } from "../components/Firebase";

const App = props => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // Set storage to prevent glitches on page reloads
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setAuthUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setAuthUser(null);
      }
    });
  }, [props]);

  return (
      <Router>
        <Navigation authUserState={authUser} />
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/blog"} component={Blog} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUpPage} />
      </Router>
  );
};

export default withFirebase(App);
