import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";

//
const Navigation = ({ authUserState }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem("authUser")));
  }, [authUserState]);

  return (
    <div>
      {authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />}
    </div>
  );
};

const NavigationAuth = props => (
  <nav className="main-nav">
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.BLOG}>Blog</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
    <h4 style={{ textAlign: "center", backgroundColor: "skyblue", padding: "1rem" }}>User: {props.user.email}</h4>
  </nav>
);

const NavigationNonAuth = () => (
  <nav className="main-nav">
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.BLOG}>Blog</Link>
      </li>
      <li>
        <Link to={ROUTES.LOGIN}>Sign In</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
