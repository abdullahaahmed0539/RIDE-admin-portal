import React from "react";
import { Link } from "react-router-dom";
import LoginNav from "./UI/LoginNav";
import ModeratorNav from "./UI/ModeratorNav";

const NavBar = ({ history }) => {

  const userAccess = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("loggedIn");
      
    }
    window.location = "/login";
  };
  return (
    <nav
      className="navbar navbar-dark navbar-expand-md "
      style={{ backgroundColor: "#9142FC" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong>Ride</strong>
        </Link>
        {localStorage.getItem("loggedIn") === "true" && (
          <ModeratorNav userAccess={userAccess} />
        )}
        {localStorage.getItem("loggedIn") === null && (
          <LoginNav/>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
