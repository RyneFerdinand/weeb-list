import AnimeCard from "../../components/anime-card/AnimeCard"
import { useState, useEffect } from 'react'
import axios from 'axios'
import "./AnimePage.css"
import 'react-dropdown/style.css';
import { useLocation } from "react-router-dom";
import queryString from 'query-string'
import LoadingBar from 'react-top-loading-bar'

function AnimePage(){

    const { search } = useLocation();
    let searchObj = queryString.parse(search);


    const [animeList, setAnimeList] = useState([]);
    const [query, setQuery] = useState(()=> (searchObj.q !== undefined ? searchObj.q : ""));
    const [genre, setGenre] = useState(()=>[]);
    const [sortBy, setSortBy] = useState(()=>[]);
    const [season, setSeason] = useState(()=>[]);
    const [yearList, setYearList] = useState(()=>[]);
    const [year, setYear] = useState(()=>2022);
    const [fetchProgress, setFetchProgress] = useState(()=> 0);

    const getAnime = async () => {
        setAnimeList([]);
        let API_URL = "http://localhost:8080/anime/search?q=" + query;
        console.log(API_URL);
        let anime;
        try {
            anime = await axios.get(API_URL, {
                onDownloadProgress: progressEvent => {
                    setFetchProgress(Math.floor((progressEvent.loaded / progressEvent.total) * 100));
                }
            });
            setFetchProgress(30);
            if(anime.data.results.length !== 50){
                anime.data.results = anime.data.results.slice(0, 50);
            }
            setAnimeList(anime.data.results);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAnime();
    }, [query]);

    useEffect(()=>{
        const getFilters = async ()=> {
            let API_URL = "http://localhost:8080/anime/sort";
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

    useEffect(() => {
        setQuery(encodeURI(searchObj.q !== undefined ? searchObj.q : ""));
        updateQuery();
    }, [searchObj]);

    function updateQuery(){
        let q = "";

        let seasonChosen = false;
        season.forEach(season => {
            if(season.selected){
                q += ("&season=" + season.season.toLowerCase());
                seasonChosen = true;
            }
        })

        if(seasonChosen){
            q += ("&year=" + year);
        } else {
            let exist = false;
            genre.forEach(gen => {
                if(gen.selected && !exist){
                    exist = true;
                    q += "&genre=" + gen.genreID;
                } else if(gen.selected){
                    q += "," + gen.genreID;
                }
            });
    
    
            sortBy.forEach(sort => {
                if(sort.selected){
                    q += ("&order_by=" + (sort.sortBy === "Latest Added" ? "start_date" : sort.sortBy.toLowerCase()));
                } 
            })
    
        }
        setQuery(prevQuery => (prevQuery + q));
    }
    
    function changeGenreState(selectedGenre){
        let tempGenre = genre;
        
        tempGenre.forEach(gen => {
            if(gen.genreID === selectedGenre.genreID){
                gen.selected = !gen.selected;
            }
        });
        setGenre([...tempGenre]);
        updateQuery();
    }

    function changeSortState(selectedSort){
        let tempSort = sortBy;
        tempSort.forEach(sort => {
            if(sort.sortBy === selectedSort.sortBy){
                sort.selected = !sort.selected;
            } else {
                sort.selected = false;
            }
        })
        setSortBy([...tempSort]);
        updateQuery();
    }

    function changeSeasonState(selectedSeason){
        let tempSeason = season;
        tempSeason.forEach(season => {
            if(season.season === selectedSeason.season){
                season.selected = !season.selected;
            } else {
                season.selected = false;
            }
        })
        setSeason([...tempSeason]);
        updateQuery();
    }

    function changeYearState(selectedYear){
        setYear(selectedYear.target.value);
        let seasonChosen = false;
        season.forEach(season => {
            if(season.selected){
                seasonChosen = true;
            }
        })
        if(seasonChosen){
            updateQuery();
        }
    }

    return (
        
        <div className="anime-page">
            <LoadingBar
                color='#44B9DE'
                progress={fetchProgress}
                height={3}
                transitionTime={100}
                loaderSpeed={400}
                waitingTime={500}
                onLoaderFinished={() => setFetchProgress(0)}
            />
            <div className="anime-section custom-container">
                <h1 className="text--blue">Anime</h1>
                <div className="anime-data d-flex flex-row">
                    
                    <div className="card-container">
                    {
                        animeList?.map(anime=>{
                            return(
                                    <AnimeCard key={anime.mal_id} anime={anime} type={"search"}/>
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
                        <h4 className="filter-title">Year</h4>
                        <select className="form-select custom-select" onClick={(e)=>{changeYearState(e)}}>
                            {
                                yearList?.map(year=>
                                    <option value={year}>{year}</option>
                                )
                            }
                        </select>
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