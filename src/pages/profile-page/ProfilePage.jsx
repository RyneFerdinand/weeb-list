import React, {useEffect, useState} from 'react'
import Dashboard from "../../components/dashboard/Dashboard";
import UpdateProfile from "../../components/update-profile/UpdateProfile";
import ChangePassword from "../../components/change-password/ChangePassword";
import './Profile.css'
import { Axios } from 'axios';

function ProfilePage(){
    const [currPage, setCurrentPage] = useState('dashboard')

    function buttonClassName(page){
        return (page == currPage) ? 'profile-button-active' : ''
    }

    function handleProfileButton(buttonText)
    {
        if(buttonText != currPage){
            setCurrentPage(buttonText);
        }
    }
    
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")
    const [joined, setJoined] = useState("")

    useEffect(() => {
        Axios.get('http://localhost:3001/getprofile').then((response) => {
            setUsername(response.data.username)
            setGender(response.data.gender)
            setJoined(response.data.joined)
        })
    }, [])

    return(
        <div className="profile-container">
            <div className='container py-5 text-light'>
                <h1 className='header-title fw-bolder mb-3'>Budi's <span className='header-span'>Profile</span></h1>
                <div className="d-flex">
                    <div className="w-25 py-5"> 
                        <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/h0A3pzHaNTVRD7xNfabuoyadJba.jpg" alt="" 
                        className='profile-image mb-3'/>
                        <div className="d-flex profile-detail">
                            <p className='w-50'>Username</p>
                            <p className='w-50'>{username}</p>
                        </div>
                        <div className="d-flex profile-detail">
                            <p className='w-50'>Gender</p>
                            <p className='w-50'>{gender}</p>
                        </div>
                        <div className="d-flex profile-detail">
                            <p className='w-50'>Joined</p>
                            <p className='w-50'>{joined}</p>
                        </div>
                        <div className='mt-3 d-flex flex-column align-items-center justify-content-between profile-page'>
                            <button className={'profile-button ' + buttonClassName('dashboard')} onClick={()=> handleProfileButton('dashboard')}>Dashboard</button>
                            <button className={'profile-button ' + buttonClassName('update-profile')} onClick={()=> handleProfileButton('update-profile')}>Update Profile</button>
                            <button className={'profile-button ' + buttonClassName('change-password')} onClick={()=> handleProfileButton('change-password')}>Change Password</button>
                        </div>
                    </div>
                    <div className="w-75 px-3">
                        {currPage == 'dashboard' && <Dashboard/>}
                        {currPage == 'update-profile' &&<UpdateProfile/>}
                        {currPage == 'change-password' &&<ChangePassword/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;