import React from 'react'
import './Header.css'
import WebsiteLogo from '../../Website Logo.png';
import SearchBar from '../SearchBar/SearchBar';
import anime from '../../MOCK_DATA.json'

function Header() {
    return (
        <div className="HeaderPage">
        <header className="App-header">
          <nav>
              <img className="web-logo"
              src={WebsiteLogo}
              alt= "logo"/>
            <div className ="bar">
              <a className="menu-bar" href="https://react.org">Home</a>
            </div>
            <div className ="bar">
              <a className="menu-bar" href="https://react.org">Anime</a>
            </div>
            
            <SearchBar placeholder="Search anime, genre, and more..." data={anime}/>
  
            <div className="right-bar">
              <a href="https://mywatchlist.com"className = "menu-bar">My watchlist</a>
            </div>
            <div className="user"> 
              <a href="https://user.com" ><i class="fal fa-user"></i></a>
            </div>
          </nav>
        </header>
      </div>
    )
}

export default Header
