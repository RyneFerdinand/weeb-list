import "./DetailPageStyle.css"
import poster from "../../assets/sangatsu.jpg"
import GenreTag from "../../components/genre-tag/GenreTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CharacterCard from "../../components/character-card/CharacterCard";
import ReviewCard from "../../components/review-card/ReviewCard";
import RecommendationCard from "../../components/recommendation-card/RecommendationCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

    let reviews = [
        {
            "profile": "https://media-exp1.licdn.com/dms/image/C4E03AQGIbxivyhW18Q/profile-displayphoto-shrink_800_800/0/1632250683020?e=1645056000&v=beta&t=juY6_qRxSSAmWTMjWCrzKYGXqtkCNtyVQ3zZKdGOLnE",
            "name": "Hans",
            "description": "This is very good",
            "rating": "10"
        },
        {
            "profile": "https://media-exp1.licdn.com/dms/image/C4E03AQGIbxivyhW18Q/profile-displayphoto-shrink_800_800/0/1632250683020?e=1645056000&v=beta&t=juY6_qRxSSAmWTMjWCrzKYGXqtkCNtyVQ3zZKdGOLnE",
            "name": "Hans",
            "description": "This is amazing",
            "rating": "10"
        },
        {
            "profile": "https://media-exp1.licdn.com/dms/image/C4E03AQGIbxivyhW18Q/profile-displayphoto-shrink_800_800/0/1632250683020?e=1645056000&v=beta&t=juY6_qRxSSAmWTMjWCrzKYGXqtkCNtyVQ3zZKdGOLnE",
            "name": "Hans",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam accusamus tempora ipsum distinctio, voluptas suscipit dignissimos placeat repellendus rerum tenetur nostrum nihil, unde molestiae corporis amet itaque explicabo dolore cum a aperiam quas magni laborum voluptatibus commodi! Nam, facilis adipisci.",
            "rating": "9"
        }
    ]

    let recommendations = [
        {
            "poster": "https://cdn.myanimelist.net/images/anime/11/75274.jpg",
            "title": "Bakemonogatari",
            "rating": "8.35"
        },
        {
            "poster": "https://cdn.myanimelist.net/images/anime/3/67177.jpg",
            "title": "Shigatsu wa Kimi no Uso",
            "rating": "8.68"
        },
        {
            "poster": "https://cdn.myanimelist.net/images/anime/1896/119844.jpg",
            "title": "JoJo no Kimyou na Bouken Part 6: Stone Ocean",
            "rating": "8.74"
        },
        {
            "poster": "https://cdn.myanimelist.net/images/anime/1613/102179.jpg",
            "title": "Seishun Buta Yarou wa Yumemiru Shoujo no Yume wo Minai",
            "rating": "8.64"
        },
        {
            "poster": "https://cdn.myanimelist.net/images/anime/1097/109646.jpg",
            "title": "Beastars 2nd Season",
            "rating": "7.90"
        },
        {
            "poster": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx142329-Oa6NT07c5KOn.jpg",
            "title": "Kimetsu no Yaiba: Yuukaku-hen",
            "rating": "8.66"
        },
        {
            "poster": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx133965-9TZBS4m4yvED.png",
            "title": "Komi-san wa, Komyushou desu.",
            "rating": "8.26"
        }

    ]

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4,
          slidesToSlide: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 
        }
      };
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
                            <p>8.97</p>
                        </span>
                    </div>
                    <div className="information-section__fourth">
                        <p className="description-section">
                            Having reached professional status in middle school, Rei Kiriyama is one of the few elite in the world of shogi. Due to this, he faces an enormous amount of pressure, both from the shogi community and his adoptive family. Seeking independence from his tense home life, he moves into an apartment in Tokyo. As a 17-year-old living on his own, Rei tends to take poor care of himself, and his reclusive personality ostracizes him from his peers in school and at the shogi hall.
                        </p>
                    </div>

                </div>
            
            </div>
            <div className="character-section d-flex flex-column justify-content-start custom-container">
                <h1>Characters & <span className="text--blue">Voice Actors</span></h1>

                <div className="character-section__cards">
                    <div className="row row-cols-3">
                    {
                        characters.map(character => <CharacterCard character={character}/>)
                    }
                    </div>
                </div>
                <button className="d-flex flex-row align-items-center load-button">
                    <FontAwesomeIcon icon={['fas', 'chevron-down']} style={{ color: "#44C1E9" }} />
                    <p>Load More</p>
                </button>
                
            </div>

            
            <div className="d-flex flex-column review-section custom-container">
                <h1>Review</h1>
                <div className="review-section__review d-flex flex-column">
                    {
                        reviews.map(review=><ReviewCard review={review}/>)
                    }
                </div>
                <button className="d-flex flex-row align-items-center load-button">
                    <FontAwesomeIcon icon={['fas', 'chevron-down']} style={{ color: "#44C1E9" }} />
                    <p>Load More</p>
                </button>
            </div>

            <div className="recommendation-section custom-container d-flex flex-column">
                
                <h1>More <span className="text--blue">Like</span> This</h1>
                <div className="recommendation-section__cards">
                    <Carousel 
                        swipeable={false} 
                        className="card-wrapper" 
                        draggable={false} 
                        partialVisbile={false} 
                        responsive={responsive}
                        containerClass="carousel-container"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {
                            recommendations.map(recommendation => <RecommendationCard recommendation={recommendation}/>)
                        }
                    </Carousel>
                </div>
  
            </div>

        </div>
    )
}

export default DetailPage