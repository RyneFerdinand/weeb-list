import SearchCard from "../../components/search-card/SearchCard"
import { useState, useEffect } from 'react'
import axios from 'axios'
import "./AnimePage.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function AnimePage(){

    const [animeList, setAnimeList] = useState(()=> []);
    const [query, setQuery] = useState(()=> "");
    const [genre, setGenre] = useState(()=>[]);
    const [sortBy, setSortBy] = useState(()=>[]);
    const [season, setSeason] = useState(()=>[]);
    const [yearList, setYearList] = useState(()=>[]);
    const [year, setYear] = useState(()=>"Year");

    useEffect(() => {
        const getAnime = async () => {
            let API_URL = "http://localhost:8080/anime/search?q=" + query;
            console.log(API_URL);
            try {
                const anime = await axios.get(API_URL);
                setAnimeList(anime.data.results);
            } catch (error) {
                console.log(error.message);
            }
        }
        getAnime();
    }, [query]);

    useEffect(()=>{
        const getFilters = async ()=> {
            let API_URL = "http://localhost:8080/anime/sort" + query;
            try {
                let sort = await axios.get(API_URL);
                sort = sort.data;
                sort.forEach(sortBy => {
                    if(sortBy.sortBy === "start_date"){
                        sortBy.sortBy = "Latest Added";
                    }
                    sortBy.sortBy = sortBy.sortBy[0].toUpperCase() + sortBy.sortBy.substring(1);
                    sortBy.selected = false;
                });
                setSortBy(sort);
            } catch (error) {
                console.log(error.message);
            }
            
            API_URL = "http://localhost:8080/anime/genre";
            try {
                let genres = await axios.get(API_URL);
                genres = genres.data;
                genres.forEach(genre => {
                    genre.selected = false;
                });
                setGenre(genres);
            } catch (error) {
                console.log(error.message);
            }

            API_URL = "http://localhost:8080/anime/season";
            try {
                let seasons = await axios.get(API_URL);
                seasons = seasons.data;
                seasons.forEach(season => {
                    season.selected = false;
                });
                setSeason(seasons);
            } catch (error) {
                console.log(error.message);
            }

            let years = [];

            let currYear = new Date().getFullYear() + 1;
            for (let count = currYear; count >= 1917; count--) {
                years.push(count);
            }
            setYearList(years);
        }
        getFilters();
    }, []);
    
    function changeGenreState(selectedGenre){
        let tempGenre = genre;
        let genreQuery = "&genre=";
        let first = true;
        
        tempGenre.forEach(gen => {
            if(gen.genreID === selectedGenre.genreID){
                gen.selected = !gen.selected;
            }
            if(gen.selected){
                if(first){
                    genreQuery += gen.genreID;
                    first = false;
                } else{
                    genreQuery += "," + gen.genreID;
                }
            }
        });
        setQuery(genreQuery);
        setGenre([...tempGenre]);
    }

    function changeSortState(selectedSort){
        let tempSort = sortBy;
        tempSort.forEach(sort => {
            if(sort.sortBy === selectedSort.sortBy){
                sort.selected = !sort.selected;
            }
        })
        setSortBy([...tempSort]);
    }

    function changeSeasonState(selectedSeason){
        let tempSeason = season;
        tempSeason.forEach(season => {
            if(season.season === selectedSeason.season){
                season.selected = !season.selected;
            }
        })
        setSeason([...tempSeason]);
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


                    <div className="filter-container">
                        <h4 className="filter-title">Sort By</h4>
                        {
                            sortBy?.map(sort=>
                                <button value={sort.sortBy} className={sort.selected === true ? "toggle-btn btn-selected" : "toggle-btn"} onClick={() => changeSortState(sort)}>{sort.sortBy}</button>
                            )
                        }
                        <h4 className="filter-title">Season</h4>
                        {
                            season?.map(season=>
                                <button value={season.season} className={season.selected === true ? "toggle-btn btn-selected" : "toggle-btn"} onClick={() => changeSeasonState(season)}>{season.season}</button>
                            )
                        }
                        <h4 className="filter-title">Genre</h4>
                        {
                            genre?
                            genre.map(gen =>
                                <button value={gen.genreID} className={gen.selected === true ? "toggle-btn btn-selected" : "toggle-btn"} onClick={() => changeGenreState(gen)}>{gen.genreName}</button>
                            ) : <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimePage