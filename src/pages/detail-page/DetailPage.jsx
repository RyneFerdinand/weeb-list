import "./DetailPageStyle.css"
import poster from "../../assets/sangatsu.jpg"
import GenreTag from "../../components/genre-tag/GenreTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CharacterCard from "../../components/character-card/CharacterCard";

function DetailPage(){
    let genres = ["Drama", "Slice of Life"];
    let characters = [
        {
            "charName": "Kiriyama, Rei",
            "charImage": "https://cdn.myanimelist.net/images/characters/14/320199.jpg",
            "role": "Main",
            "vaName": "Kawanishi, Kengo",
            "vaImage": "https://cdn.myanimelist.net/images/voiceactors/1/63509.jpg"
        },
        {
            "charName": "Kawamoto, Hinata",
            "charImage": "https://cdn.myanimelist.net/images/characters/6/320379.jpg",
            "role": "Main",
            "vaName": "Hanazawa, Kana",
            "vaImage": "https://cdn.myanimelist.net/images/voiceactors/3/61259.jpg"
        },
        {
            "charName": "Kawamoto, Akari",
            "charImage": "https://cdn.myanimelist.net/images/characters/6/320383.jpg",
            "role": "Main",
            "vaName": "Kayano, Ai",
            "vaImage": "https://cdn.myanimelist.net/images/voiceactors/3/60503.jpg"
        },
        {
            "charName": "Kawamoto, Momo",
            "charImage": "https://cdn.myanimelist.net/images/characters/16/314603.jpg",
            "role": "Main",
            "vaName": "Kuno, Misaki",
            "vaImage": "https://cdn.myanimelist.net/images/voiceactors/1/62089.jpg"
        },
        {
            "charName": "Shimada, Kai",
            "charImage": "https://cdn.myanimelist.net/images/characters/8/321343.jpg",
            "role": "Supporting",
            "vaName": "Miki, Shiniciro",
            "vaImage": "https://cdn.myanimelist.net/images/voiceactors/3/54678.jpg"
        },
        {
            "charName": "Nikaido, Harunobu",
            "charImage": "https://cdn.myanimelist.net/images/characters/14/314605.jpg",
            "role": "Supporting",
            "vaName": "Okamoto, Nobuhiko",
            "vaImage": "https://cdn.myanimelist.net/images/voiceactors/2/48785.jpg"
        }
    ]

    return (
        <div className="detail-page">
            <div className="d-flex flex-row align-items-center information-section custom-container">
                <img src={poster} alt="" className="anime-poster" />
                <div className="d-flex flex-column anime-detail">
                    <h1>March Comes in Like a Lion 2nd Season</h1>
                    <div className="information-section__second align-items-center d-inline-flex">
                        <span className="d-flex align-items-center genre-container">
                            {genres?.map((genre, idx) => {return idx + 1 === genres.length ? <GenreTag tag={genre}/> : <GenreTag tag={genre + ","}/>})}
                        </span>
                        <p>
                            | Oct 14, 2017 - Mar 31, 2018 | 25 mins
                        </p>
                    </div>
                    <div className="d-flex flex-row align-items-center information-section__third">
                        <h5>Overview</h5>
                        <span className="d-flex flex-row align-items-center rating">
                            <FontAwesomeIcon icon={['fas', 'star']} style={{ color: "#E4C44F" }} />
                            <p>5.89</p>
                        </span>
                    </div>
                    <div className="information-section__fourth">
                        <p className="description-section">
                            Having reached professional status in middle school, Rei Kiriyama is one of the few elite in the world of shogi. Due to this, he faces an enormous amount of pressure, both from the shogi community and his adoptive family. Seeking independence from his tense home life, he moves into an apartment in Tokyo. As a 17-year-old living on his own, Rei tends to take poor care of himself, and his reclusive personality ostracizes him from his peers in school and at the shogi hall.
                        </p>
                    </div>

                </div>
            
            </div>
            <div className="character-section custom-container">
                <h1>Characters & <span className="text--blue">Voice Actors</span></h1>

                <div className="character-section">
                    <div className="row row-cols-3">
                    {
                        characters.map(character => <CharacterCard character={character}/>)
                    }
                    </div>

                </div>
                
            </div>

            
            <div className="review-section">
                
            </div>
            <div className="recommendation-section">

            </div>

        </div>
    )
}

export default DetailPage