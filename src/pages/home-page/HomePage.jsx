import "./HomePageStyle.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroBanner from "../../components/hero-banner/HeroBanner";

function HomePage(){

    const [anime, setAnime] = useState(async ()=>[]);

    const getHomeAnime = async () => {
        let API_URL = "http://localhost:8080/anime/home";
        try {
            let tempAnimeList = await axios.get(API_URL);
            setAnime(tempAnimeList.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect( ()=>{
        getHomeAnime();
    }, []);
    
    console.log(anime);

    return (
        <div className="home-page">
            {typeof anime[0] !== typeof undefined ?
                <div> 
                    <HeroBanner
                    alignment={"left"} 
                    mal_id={anime[0].mal_id}
                    firstTitle={anime[0].firstTitle}
                    secondTitle={anime[0].secondTitle}
                    animeTitle={anime[0].title}
                    animeRating={anime[0].rating}
                    animeGenre={anime[0].genre}
                    animeShow={anime[0].show}
                    animeDescription={anime[0].description}
                    image={anime[0].image}
                    />
                    <HeroBanner
                    alignment={"right"}
                    mal_id={anime[1].mal_id}
                    firstTitle={anime[1].firstTitle}
                    secondTitle={anime[1].secondTitle}
                    animeTitle={anime[1].title}
                    animeDate={anime[1].date}
                    animeGenre={anime[1].genre}
                    animeShow={anime[1].show}
                    animeDescription={anime[1].description}
                    image={anime[1].image}
                    />
                    <HeroBanner
                    alignment={"left"} 
                    mal_id={anime[2].mal_id}
                    firstTitle={anime[2].firstTitle}
                    secondTitle={anime[2].secondTitle}
                    animeTitle={anime[2].title}
                    animeRating={anime[2].rating}
                    animeGenre={anime[2].genre}
                    animeShow={anime[2].show}
                    animeDescription={anime[2].description}
                    image={anime[2].image}
                    />
                </div>:
                <></>
            }
        </div>
    )
}

export default HomePage