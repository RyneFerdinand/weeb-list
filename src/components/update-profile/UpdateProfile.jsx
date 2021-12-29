import React from 'react'
import './UpdateProfile.css'

function UpdateProfile(){
    return(
        <div className='container'>
            <h2 className='form-title fw-bolder mb-5'>Update Profile</h2>
            <form>
                <div class="mb-3 input-group">
                    <label htmlFor="name" class="form-label input-group-text">Name</label>
                    <input type="text" class="form-control"/>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor='email'class="form-label input-group-text">Email</label>
                    <input type="email" class="form-control" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="username" class="form-label input-group-text">Username</label>
                    <input type="text" class="form-control"/>
                </div>
                <div class="mb-3 input-group">
                    <label htmlFor="gender" class="form-label input-group-text">Gender</label>
                    <select class="form-control form-select" aria-label=".form-select-lg example">
                        <option selected>Open this select menu</option>
                        <option value="male bg-dark">Male</option>
                        <option value="female bg-dark">Female</option>
                    </select>
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