import React from 'react'
import './Register.css'
import WebsiteLogo from '../../Website Logo.png'

function Register() {
    return (
        <div className = "register">
            <div className="website-logo">
                <img src={WebsiteLogo}></img>
            </div>
            <div className="register-content">
                <div className="left">
                    <div className="caption">
                        <h1>Create New <a>Weeb List</a> Account.</h1>
                    </div>
                    <div className="sub-caption">
                        <p>Already have an account? <a href="https://weeblist.com/login">Log in</a></p>
                    </div>
                </div>
                <div className="right">
                    <form action=""> 
                        <div className="form-box1">
                            <p>Name</p>
                            <input type="text" placeholder="Enter your name here" name="name"></input>
                        </div>
                        <div className="form-box1">
                            <p>Username</p>
                            <input type="text" placeholder="Enter your username here" name="username"></input>
                        </div>
                        <div className="form-box1">
                            <p>Email</p>
                            <input type="email" placeholder="Enter your email here" name="email"></input>
                        </div>
                        <div className="form-box1">
                            <p>Password</p>
                            <input type="password" placeholder="Enter your password here" name="password"></input>
                        </div>

                        <div className="terms">
                            <input type="checkbox" name="terms&condition"></input>
                            <p>I agree to the <a>Terms of Services</a> and <a>Privacy Policy</a></p>
                        </div>

                        <div className="createAcc">
                            <input type="submit" value="Create Account"></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="register-back">
                <a><i className="fas fa-chevron-left"></i> Back to Home</a>
            </div>
        </div>
    )
}

export default Register
