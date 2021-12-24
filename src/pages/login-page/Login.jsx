import React from 'react'
import './Login.css'
import WebsiteLogo from '../../Website Logo.png'

function Login() {
    return (
        <div className = "login">
            <div className="website-logo">
                <img src={WebsiteLogo}></img>
            </div>
            <div className="content">
                <div className="left">
                    <div className="caption">
                        <h1>Welcome back to <a>Weeb List</a>.</h1>
                    </div>
                    <div className="sub-caption">
                        <p>Don't have an account? <a href="https://weeblist.com/register">Create a new one</a></p>
                    </div>
                </div>
                <div className="right">
                    <form action=""> 
                        <div className="form-box">
                            <p>Username</p>
                            <input type="text" placeholder="Enter your username here" name="username"></input>
                        </div>
                        <div className="form-box">
                            <p>Password</p>
                            <input type="password" placeholder="Enter your password here" name="password"></input>
                        </div>

                        <div className="login-button">
                            <input type="submit" value="Login"></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="back">
                <a><i class="fas fa-chevron-left"></i> Back to Home</a>
            </div>
        </div>
    )
}

export default Login
