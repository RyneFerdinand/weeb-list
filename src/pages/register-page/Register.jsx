import React, { useState } from 'react'
import './Register.css'
import WebsiteLogo from '../../Website Logo.png'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

function Register() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const history = useHistory()
    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post('http://localhost:3001/register', {username: username, name: name, password: password, email: email, checkbox: checkbox}).then((response) => {
            alert(response.data.message)
            if (response.data.registeredIn === true){   
                history.push('/login')
            }
        }) 
    }

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
                        <p>Already have an account? <a href="http://localhost:3000/#/login">Log in</a></p>
                    </div>
                </div>
                <div className="right">
                    <div> 
                        <div className="form-box1">
                            <p>Name</p>
                            <input 
                                type="text" 
                                placeholder="Enter your name here" 
                                name="name"
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                            >
                            </input>
                        </div>
                        <div className="form-box1">
                            <p>Username</p>
                            <input 
                                type="text" 
                                placeholder="Enter your username here" 
                                name="username"
                                onChange={(event) => {
                                    setUsername(event.target.value)
                                }}
                            >
                            </input>
                        </div>
                        <div className="form-box1">
                            <p>Email</p>
                            <input 
                                type="email" 
                                placeholder="Enter your email here" 
                                name="email"
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            >
                            </input>
                        </div>
                        <div className="form-box1">
                            <p>Password</p>
                            <input 
                                type="password" 
                                placeholder="Enter your password here" 
                                name="password"
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                            >
                            </input>
                        </div>

                        <div className="terms">
                            <input type="checkbox" name="terms&condition"
                                onClick={(event) => {
                                    setCheckbox(event.target.checked)
                                }}
                            ></input>
                            <p>I agree to the <a>Terms of Services</a> and <a>Privacy Policy</a></p>
                        </div>

                        <div className="createAcc">
                            <input type="submit" value="Create Account"
                                onClick={register}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="register-back">
                <a><i class="fas fa-chevron-left"></i> Back to Home</a>
            </div>
        </div>
    )
}

export default Register
