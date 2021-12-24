import React from 'react'
import WebsiteLogo from '../../Website Logo.png'
import './Footer.css'

function Footer() {
    return (
        <div className = "footer">
            <div className = "above">
                <div className ="item">
                        <img className ="footer-logo"
                            src={WebsiteLogo}
                            alt="logo"/>
                        <p className ="logo-caption">Experience Animes</p>
                    
                </div>
                <div className ="item">
                    <h1>About Us</h1>
                    <p><a>Weeb List</a> is an anime recommendation website for people who love anime. </p>
                </div>

                <div className ="item">
                    <div>
                        <h1>Follow Us</h1>
                    </div>
                    <div className = "followUs">
                        <a><i class="fab fa-twitter"></i></a>
                        <a><i class="fab fa-instagram"></i></a>
                        <a><i class="fab fa-facebook-f"></i></a>
                        <a><i class="fab fa-reddit-alien"></i></a>
                    </div>
                </div>

                <div className ="item">
                    <h1>Information</h1>
                    <p><a>Terms & condition</a></p>
                    <p><a>Privacy Policy</a></p>
                </div>

                <div className ="item">
                    <a className="back-to-top" href="https://wiki.com"><h1>Back to Top</h1> <i class="far fa-arrow-up"></i> </a>
                </div>
            </div>
            <div className="bottom">
                <p className="copy-right">Copyright © 2021 <a>Weeb List</a> All Rights Reserved  </p>
            </div>
        </div>
    )
}

export default Footer
