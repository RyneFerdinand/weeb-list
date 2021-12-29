import React from 'react'
import './ChangePassword.css'

function UpdateProfile(){
    return(
        <div className='container'>
            <h2 className='form-title fw-bolder mb-5'>Change Password</h2>
            <form>
                <div class="mb-3 input-group">
                    <label htmlFor="old_password" class="form-label input-group-text">Old Password</label>
                    <input type="password" class="form-control"/>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="new_password" class="form-label input-group-text">New Password</label>
                    <input type="password" class="form-control"/>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="confirm_password" class="form-label input-group-text">Confirm New Password</label>
                    <input type="password" class="form-control"/>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">
                    {/* <FontAwesomeIcon icon={['far', 'coffee']} /> */}
                    Save Changes
                        </button>
                </div>
            </form>
        </div> 
    )
}

export default UpdateProfile;