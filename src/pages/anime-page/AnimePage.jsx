import SearchCard from "../../components/search-card/SearchCard"
import { useState, useEffect } from 'react'
import axios from 'axios'
import "./AnimePage.css"
import ToggleButton from "../../components/toggle-button/ToggleButton"

function AnimePage(){
    
    const [animeList, setAnimeList] = useState(()=> [])
    const [query, setQuery] = useState(()=>[]);
    const [genre, setGenre] = useState(()=>[]);

    useEffect(() => {
        const getAnime = async () => {
            let API_URL = "http://localhost:8080/anime/top/1";
            try {
                const anime = await axios.get(API_URL);
                setAnimeList(anime.data.top);
            } catch (error) {
                console.log(error.message);
            }
        }
        getAnime();
    }, [query]);

    useEffect(()=>{
        const getGenres = async ()=> {
        let API_URL = "http://localhost:8080/anime/genre";
            try {
                let  genres = await axios.get(API_URL);
                genres = genres.data;
                genres.forEach(genre => {
                    genre.selected = false;
                });
                setGenre(genres);
            } catch (error) {
                console.log(error.message);
            }
        }
        getGenres();
    }, []);

    function changeButtonState(selectedGenre){
        let tempGenre = genre;
        tempGenre.forEach(gen => {
            if(gen.genreID === selectedGenre.genreID){
                gen.selected = !gen.selected;
            }
        });

        setGenre(tempGenre);
    }

    return (
        <div className="anime-page">
            <div className="anime-section custom-container">
                <h1 className="text--blue">Anime</h1>
                <div className="anime-data d-flex flex-row">
                    
                        <div className="card-container">
                        {
                            animeList?.map(anime=>{
                                return(
                                        <SearchCard key={anime.mal_id} anime={anime}/>
                                    )
                                })
                        }
                        </div>


                </div>
                {/*
                    genre?
                    genre.map(gen=> <ToggleButton key={gen.genreID} value={gen} buttonState={gen => changeButtonState(gen)} />) :  <></>
                */}
            </div>
        </div>
    )
}

export default AnimePage