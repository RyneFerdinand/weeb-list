import SearchCard from "../../components/search-card/SearchCard"
import { useState, useEffect } from 'react'
import axios from 'axios'
import "./AnimePage.css"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from "react-router-dom";

function AnimePage(){
    
    const [animeList, setAnimeList] = useState(()=> [])
    const [query, setQuery] = useState(() => [])

    useEffect(() => {
        const getAnime = async () => {
            let API_URL = "http://localhost:8080/anime/top/1";
            console.log(API_URL)
            try {
                const anime = await axios.get(API_URL);
                setAnimeList(anime.data.top);
            } catch (error) {
                console.log(error);
            }
        }
        getAnime();
    }, [query]);
 
    return (
        <div className="anime-page">
            <div className="anime-section custom-container">
            <h1 className="text--blue">Anime</h1>
                {/* <div className="anime-data d-flex flex-row"> */}
                    
                        <div className="card-container">
                        {
                            animeList?.map(anime=>{
                                return(
                                        <SearchCard anime={anime}/>
                                    )
                                })
                        }
                        </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default AnimePage