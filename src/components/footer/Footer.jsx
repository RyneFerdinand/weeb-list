import React, { useState } from "react";
import WebsiteLogo from "../../Website Logo.png";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink as Link } from "react-router-hash-link";

function Footer() {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <div className="footer">
      <div className="above">
        <div className="item">
          <img className="footer-logo" src={WebsiteLogo} alt="logo" />
          <p className="logo-caption">Experience Animes</p>
        </div>
        <div className="item">
          <h1>About Us</h1>
          <p>
            <span className="text--blue">Weeb List</span> is an anime
            recommendation website for people who love anime.{" "}
          </p>
        </div>

        <div className="item">
          <div>
            <h1>Follow Us</h1>
          </div>
          <div className="followUs">
            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                className="follow-us-icon"
              />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={["fab", "instagram"]}
                className="follow-us-icon"
              />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={["fab", "facebook-f"]}
                className="follow-us-icon"
              />
            </div>
            <div className="icon-wrapper">
              <FontAwesomeIcon
                icon={["fab", "reddit-alien"]}
                className="follow-us-icon"
              />
            </div>
          </div>
        </div>

        <div className="item">
          <h1>Information</h1>
          <p>
            <Link>Terms & condition</Link>
          </p>
          <p>
            <Link>Privacy Policy</Link>
          </p>
        </div>

        <div className="item">
          <div  onClick={scrollTop} className="back-to-top" >
            <h1>Back to Top</h1>
            <FontAwesomeIcon
              icon={["fa", "arrow-up"]}
              style={{ color: "#44B9DE", fontSize: "2rem" }}
            />
          </div>
        </div>
      </div>
      <div className="bottom">
        <p className="copy-right">
          Copyright © 2021 <span className="text--blue">Weeb List</span> All
          Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
