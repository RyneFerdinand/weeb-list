import React, { useState, useEffect } from 'react'
import './UpdateProfile.css'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

function UpdateProfile(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")

    useEffect(() => {
        Axios.get('http://localhost:3001/updateprofile').then((response) => {
            setName(response.data.name)
            setEmail(response.data.email)
            setUsername(response.data.username)
            setGender(response.data.gender)
        })
    }, [])

    const update = () => {
        Axios.post('http://localhost:3001/updateprofile', {name: name, email: email, username: username, gender: gender}).then((response) => {
            alert(response.data.message)
            if (response.data.message === 'Update successful'){
                window.location.reload()
            }
        })
    }

    return(
        <div className='container'>
            <h2 className='form-title fw-bolder mb-5'>Update Profile</h2>
            <div>
                <div class="mb-3 input-group">
                    <label htmlFor="name" class="form-label input-group-text">Name</label>
                    <input type="text" class="form-control" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor='email'class="form-label input-group-text">Email</label>
                    <input type="email" class="form-control" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="username" class="form-label input-group-text">Username</label>
                    <input type="text" class="form-control" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="gender" class="form-label input-group-text">Gender</label>
                    <select class="form-control form-select" aria-label=".form-select-lg example"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option selected>Open this select menu</option>
                        <option value="male bg-dark">Male</option>
                        <option value="female bg-dark">Female</option>
                    </select>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary" onClick={update}>
                    {/* <FontAwesomeIcon icon={['far', 'coffee']} /> */}
                    Save Changes
                        </button>
                </div>
            </div>
        </div> 
    )
}

export default UpdateProfile;