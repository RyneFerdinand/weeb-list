import React, {useEffect, useState} from 'react'
import Dashboard from "../../components/dashboard/Dashboard";
import UpdateProfile from "../../components/update-profile/UpdateProfile";
import ChangePassword from "../../components/change-password/ChangePassword";
import './Profile.css'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

function ProfilePage(){
    Axios.defaults.withCredentials = true;
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
    
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("")
    const [joined, setJoined] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const history = useHistory()

    useEffect(() => {
        Axios.get('http://localhost:3001/getprofile').then((response) => {
            if (response.data.message === 'You need to login first'){
                alert(response.data.message)
                history.push('/login')
            }
            else {
                setName(response.data.name)
                setUsername(response.data.username)
                setGender(response.data.gender)
                setJoined(response.data.joined)
                setProfileImage(response.data.profileImage)
            }
        })
    }, [])


    const image = (e) => {
        setProfileImage(e.target.src)
        Axios.post('http://localhost:3001/changeimage', {profileImage: e.target.src}).then((response) => {
            alert(response.data.message)
        })
    }

    return(
        <div className="profile-container">
            <div className='container py-5 text-light'>
            <h1 className='header-title fw-bolder mb-3'>{name.substring(0, name.indexOf(' '))}'s <span className='header-span'>Profile</span></h1>
                <div className="d-flex">
                    <div className="w-25 py-5"> 
                        <img src={profileImage} alt="" 
                        className='profile-image mb-3' data-bs-toggle="modal" data-bs-target="#imageModal"/>
                        <div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-dark" id="imageModalLabel">Choose image for profile</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body text-dark">
                                    <img style={{width: "200px", height: "300px"}} class="m-3" src="https://picsum.photos/200/302" value="https://picsum.photos/200/300" onClick={image}></img>
                                    <img style={{width: "200px", height: "300px"}}  class="m-3" src="https://picsum.photos/200/302" value="https://picsum.photos/200/300" onClick={image}></img>
                                    <img style={{width: "200px", height: "300px"}}  class="m-3" src="https://picsum.photos/200/302" value="https://picsum.photos/200/300" onClick={image}></img>
                                    <img style={{width: "200px", height: "300px"}}  class="m-3" src="https://picsum.photos/200/302" value="https://picsum.photos/200/300" onClick={image}></img>
                                    <img style={{width: "200px", height: "300px"}}  class="m-3" src="https://picsum.photos/200/302" value="https://picsum.photos/200/300" onClick={image}></img>
                                    <img style={{width: "200px", height: "300px"}}  class="m-3" src="https://picsum.photos/200/302" value="https://picsum.photos/200/300" onClick={image}></img>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>
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