import React, { useState, useEffect } from 'react'
import './Login.css'
import WebsiteLogo from '../../Website Logo.png'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post('http://localhost:3001/login', {username: username, password: password}).then((response) => {
            alert(response.data.message)
            if (response.data.loggedIn === true){
                history.push('/')
            }
        })
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true){
                history.push('/')
            }
        })
    }, [])

    return (
        <div className = "login">
            <div className="website-logo">
                <img src={WebsiteLogo} alt=""/>
            </div>
            <div className="content">
                <div className="left">
                    <div className="caption">
                        <h1>Welcome back to <Link to="/">Weeb List</Link>.</h1>
                    </div>
                    <div className="sub-caption">
                        <p>Don't have an account? <Link to="/register">Create a new one</Link></p>
                    </div>
                </div>
                <div className="right">
                    <div>
                        <div className="form-box">
                            <p>Username</p>
                            <input type="text" placeholder="Enter your username here" name="username"
                                onChange={(e) => setUsername(e.target.value)}>
                            </input>
                        </div>
                        <div className="form-box">
                            <p>Password</p>
                            <input type="password" placeholder="Enter your password here" name="password"
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
                        </div>

                        <div className="login-button">
                            <input type="submit" value="Login" onClick={login}></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="back">
                <Link to="/"><i class="fas fa-chevron-left"></i> Back to Home</Link>
            </div>
        </div>
    )
}

export default Login
