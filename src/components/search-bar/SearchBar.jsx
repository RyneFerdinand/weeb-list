import React, { useState, useEffect, useRef } from 'react'
import './SearchBar.css'
import axios from 'axios'
import SearchQueryCard from '../search-query-card/SearchQueryCard';
import OutsideClick from './OutsideClick';
import { useHistory } from 'react-router-dom';


function SearchBar({ placeholder }) {

    const [filteredData, setFilteredData] = useState(() => []);
    const [wordEntered, setWordEntered] = useState(() => "");
    const searchRef = useRef(null);
    const outsideClickRef = OutsideClick(searchRef);
    const queryHistory = useHistory();

    useEffect(() => {
        const getAnime = async () => {
            if(wordEntered !== ""){
                let query = wordEntered;
                let API_URL = "http://localhost:8080/anime/search?q=" + query;
                try {
                    const anime = await axios.get(API_URL);
                    setFilteredData(anime.data.results.slice(0, 10));
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                setFilteredData([]);
            }
        }
        getAnime();
    }, [wordEntered]);

    const handleFilter = (event) =>{
        const searchWord = event.target.value
        setWordEntered(searchWord);
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");

    }

    const searchQuery = (e) => {
        e.preventDefault();
        if(wordEntered.length > 2)
            queryHistory.push(`/anime?q=${encodeURI(wordEntered)}`);
    }

    return (
        <div ref={searchRef} className="search">
            <div className="searchInput">
                <form action="" onSubmit={searchQuery}>
                    <input type="text" placeholder={placeholder} value={wordEntered} onChange = {handleFilter} />
                </form>
                <div className="searchIcon">
                    {filteredData.length === 0? <p><i className="far fa-search"></i></p>  : <p id="clearBtn" onClick={clearInput}><i className="fal fa-times"></i></p>}
                </div>
            </div>
            {wordEntered.length !== 0 && filteredData.length !== 0 ? (
            <div className="dataResult" style={{ display: (outsideClickRef ? "none" : "fixed") }}>
        
                {filteredData.map(data =>{
                    return (
                        <SearchQueryCard data={data}/>
                    )
                })}
            </div>
            ): <></>
            }
        </div>
    )
}

export default SearchBar
