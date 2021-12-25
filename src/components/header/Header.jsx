import React from 'react'
import './Header.css'
import WebsiteLogo from '../../Website Logo.png';
import SearchBar from '../search-bar/SearchBar';
import anime from '../../MOCK_DATA.json'
import { Link } from 'react-router-dom';

function Header() {
    return (
      <header>
        <nav className='d-flex flex-row align-items-center'>

          <div className="left-nav d-flex flex-row align-items-center">
            <img className="web-logo"
            src={WebsiteLogo}
            alt= "logo"/>
            <div className ="bar">
              <Link to="/" className="menu-bar">Home</Link>
            </div>
            <div className ="bar">
              <Link to="anime" className="menu-bar">Anime</Link>
            </div>
          </div>
          
          <SearchBar placeholder="Search anime, genre, and more..." data={anime}/>
          
          <div className="right-nav d-flex flex-row align-items-center justify-content-end">
            <div className="right-bar">
              <a href="https://mywatchlist.com"className = "menu-bar">My watchlist</a>
            </div>
            <div className="user"> 
              <a href="https://user.com" ><i class="fal fa-user"></i></a>
            </div>
          </div>
        </nav>
      </header>
    )
}

export default Header