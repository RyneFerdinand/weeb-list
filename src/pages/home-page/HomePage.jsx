import TopAndBottom from "./TopAndBottom";
import Middle from "./Middle";
function HomePage(){
    let anime = [
        {
            "firstTitle": "Now",
            "secondTitle": "Airing",
            "title": "Takt Op. Destiny",
            "rating": 8.09,    
            "genre": "Action, Fantasy, Music",
            "show": "TV",
            "description": "The year is 2047, a world where music has been forgotten. In America which has fallen to ruin thanks to the D2, Takt, a Conductor, is partnered with a Musicart named Unmei. Takt yeans for music to be returned to the world, and Unmei wishes to destroy the D2. Their aim is to travel to New York",
            "image": "https://picsum.photos/200/300"
        },
        {
            "firstTitle": "Up",
            "secondTitle": "Coming",
            "title": "Attack on Titan Final Season 4 part 2", 
            "date": "Jan 10, 2022",
            "show": "TV",
            "description": "Second part of Shingeki no Kyojin: The Final Season.",
            "image": "https://picsum.photos/200/300"
        },
        {
            "firstTitle": "Fall 2021",
            "secondTitle": "Anime",
            "title": "Mushoku Tensei: Jobless Reincarnation",
            "rating": 8.16,    
            "genre": "Drama, Fantasy, Ecchi",
            "show": "TV",
            "description": "After the mysterious mana calamity, Rudeus Greyrat and his fierce student Eris Boreas Greyrat are teleported to the Demon Continent. There, they team up with their newfound companion Ruijerd Supardia—the former leader of ...",
            "image": "https://picsum.photos/200/300"
        },
    ]
    return (
        <div>
            <TopAndBottom 
                firstTitle={anime[0].firstTitle}
                secondTitle={anime[0].secondTitle}
                animeTitle={anime[0].title}
                animeRating={anime[0].rating}
                animeGenre={anime[0].genre}
                animeShow={anime[0].show}
                animeDescription={anime[0].description}
                image={anime[0].image}
            />
            <Middle
                firstTitle={anime[1].firstTitle}
                secondTitle={anime[1].secondTitle}
                animeTitle={anime[1].title}
                animeDate={anime[1].date}
                animeGenre={anime[1].genre}
                animeShow={anime[1].show}
                animeDescription={anime[1].description}
                image={anime[1].image}
            />
            <TopAndBottom 
                firstTitle={anime[2].firstTitle}
                secondTitle={anime[2].secondTitle}
                animeTitle={anime[2].title}
                animeRating={anime[2].rating}
                animeGenre={anime[2].genre}
                animeShow={anime[2].show}
                animeDescription={anime[2].description}
                image={anime[2].image}
            />
        </div>
    )
}

export default HomePage