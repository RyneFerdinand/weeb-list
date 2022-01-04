import React, { useState } from 'react'
import './ChangePassword.css'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

function UpdateProfile(){
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const history = useHistory()

    const changePassword = () => {
        Axios.post('http://localhost:8080/changepassword', {oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword}).then((response) => {
            alert(response.data.message)
            if (response.data.message === 'Change password successful'){
                window.location.reload()
            }
        })
    }

    return(
        <div className='container'>
            <h2 style={{ overflowY: "hidden"}} className='form-title fw-bolder mb-5'>Change Password</h2>
            <div>
                <div class="mb-3 input-group">
                    <label htmlFor="old_password" class="form-label input-group-text">Old Password</label>
                    <input type="password" class="form-control" onChange={(e) => setOldPassword(e.target.value)}></input>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="new_password" class="form-label input-group-text">New Password</label>
                    <input type="password" class="form-control" onChange={(e) => setNewPassword(e.target.value)}></input>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="confirm_password" class="form-label input-group-text">Confirm New Password</label>
                    <input type="password" class="form-control" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary" onClick={changePassword}>
                    {/* <FontAwesomeIcon icon={['far', 'coffee']} /> */}
                    Save Changes
                        </button>
                </div>
            </div>
        </div> 
    )
}

export default UpdateProfile;