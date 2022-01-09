import React, { useEffect, useState } from "react";
import "./Header.css";
import WebsiteLogo from "../../Website Logo.png";
import SearchBar from "../search-bar/SearchBar";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

function Header(props) {
  const [profileImage, setProfileImage] = useState(() => props.profileImage);
  const history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn === true) {
        props.login(true)
      } else {
        props.login(false);
      }
    });
  }, []);

  if(props.profileImage !== "" && props.profileImage !== profileImage){
    setProfileImage(props.profileImage)
  }

  if (props.loggedIn === true) {
    Axios.get("http://localhost:8080/getprofile").then((response) => {
      if (response.data.message === "You need to login first") {
        alert(response.data.message);
        history.push("/login");
      } else {
        setProfileImage(response.data.profileImage);
      }
    });
  }
  return (
    <header id="header">
      <nav className="d-flex flex-row align-items-center">
        <div className="left-nav d-flex flex-row align-items-center">
          <Link to="/" className="web-logo-wrapper">
            <img className="web-logo" src={WebsiteLogo} alt="logo" />
          </Link>
          <div className="bar">
            <Link to="/" className="menu-bar">
              Home
            </Link>
          </div>
          <div className="bar">
            <Link to="/anime" className="menu-bar">
              Anime
            </Link>
          </div>
        </div>

        <SearchBar placeholder="Search anime..." />

        <div className="right-nav d-flex flex-row align-items-center justify-content-end">
          <div className="right-bar">
            {props.loggedIn === true ? (
              <Link to="/watchlist" className="menu-bar">
                My watchlist
              </Link>
            ) : (
              <></>
            )}
          </div>
          {props.loggedIn === true ? (
            <Link to="/profile">
              <img src={profileImage} className="user" alt="" />
            </Link>
          ) : (
            <Link to="/login">
              <button className="login-header-btn">LOGIN</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
