import "./DetailPageStyle.css";
import GenreTag from "../../components/genre-tag/GenreTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CharacterCard from "../../components/character-card/CharacterCard";
import ReviewCard from "../../components/review-card/ReviewCard";
import AnimeCard from "../../components/anime-card/AnimeCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";

function DetailPage() {
  let { id } = useParams();
  const [animeId, setAnimeId] = useState(()=> "");
  let query = "";

  
  const [anime, setAnime] = useState(() => []);
  const [fetchStatus, setFetchStatus] = useState(() => true);
  const [characterCount, setCharacterCount] = useState(() => 6);
  const [fetchProgress, setFetchProgress] = useState(()=> 0);
  
  if(id !== animeId){
    setFetchStatus(true);
    setAnime({});
    setAnimeId(id);
  }

  useEffect(() => {
    const getAnime = async () => {
      let API_URL = "http://localhost:8080/anime/" + animeId;
      console.log(API_URL);
      try {
        const anime = await axios.get(API_URL, {
          onDownloadProgress: progressEvent => {
              setFetchProgress(Math.floor((progressEvent.loaded / progressEvent.total) * 100));
          }
      });
        setAnime(anime.data);
        setFetchStatus(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAnime();
  }, [query,animeId]);

  let reviews = [
    {
      profile:
        "https://media-exp1.licdn.com/dms/image/C4E03AQGIbxivyhW18Q/profile-displayphoto-shrink_800_800/0/1632250683020?e=1645056000&v=beta&t=juY6_qRxSSAmWTMjWCrzKYGXqtkCNtyVQ3zZKdGOLnE",
      name: "Hans",
      description: "This is very good",
      rating: "10",
    },
    {
      profile:
        "https://media-exp1.licdn.com/dms/image/C4E03AQGIbxivyhW18Q/profile-displayphoto-shrink_800_800/0/1632250683020?e=1645056000&v=beta&t=juY6_qRxSSAmWTMjWCrzKYGXqtkCNtyVQ3zZKdGOLnE",
      name: "Hans",
      description: "This is amazing",
      rating: "10",
    },
    {
      profile:
        "https://media-exp1.licdn.com/dms/image/C4E03AQGIbxivyhW18Q/profile-displayphoto-shrink_800_800/0/1632250683020?e=1645056000&v=beta&t=juY6_qRxSSAmWTMjWCrzKYGXqtkCNtyVQ3zZKdGOLnE",
      name: "Hans",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam accusamus tempora ipsum distinctio, voluptas suscipit dignissimos placeat repellendus rerum tenetur nostrum nihil, unde molestiae corporis amet itaque explicabo dolore cum a aperiam quas magni laborum voluptatibus commodi! Nam, facilis adipisci.",
      rating: "9",
    },
  ];

  console.log(anime)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      slidesToSlide: 1,
    },
  };

  const loadCharacter = () => {
        setCharacterCount((count) => count + 6);
    };

    const hideCharacter = () => {
        setCharacterCount(6);
    };

    return (
        <div key={id} className="detail-page">
          <LoadingBar
                color='#44B9DE'
                progress={fetchProgress}
                height={3}
                transitionTime={100}
                loaderSpeed={400}
                waitingTime={500}
                onLoaderFinished={() => setFetchProgress(0)}
            />
        {!fetchStatus ? (
            <div className="detail-content">
            <div className="d-flex flex-row align-items-center information-section custom-container">
                <img src={anime.image_url} alt="" className="anime-poster" />
                <div className="d-flex flex-column anime-detail">
              <h1>{anime.title}</h1>
              <div className="information-section__second align-items-center d-inline-flex">
                <span className="d-flex align-items-center genre-container">
                  {anime.genres?.map((genre, idx) => {
                    return idx + 1 === anime.genres.length ? (
                      <GenreTag tag={genre.name} />
                    ) : (
                      <GenreTag tag={genre.name + ","} />
                    );
                  })}
                </span>
                <p>
                  | {anime.aired.string.replace("to", "-")} |{" "}
                  {anime.duration.replace(" per ep", "s")}
                </p>
              </div>
              <div className="d-flex flex-row align-items-center information-section__third">
                <h5>Overview</h5>
                <span className="d-flex flex-row align-items-center rating">
                  <FontAwesomeIcon
                    icon={["fas", "star"]}
                    style={{ color: "#E4C44F" }}
                  />
                  <p>{anime.score ? anime.score : "N/A"}</p>
                </span>
              </div>
              <div className="information-section__fourth">
                <p className="description-section">
                  {anime.synopsis
                    ? anime.synopsis.includes(" [Written by MAL Rewrite]")
                      ? anime.synopsis.replace(" [Written by MAL Rewrite]", "")
                      : anime.synopsis
                    : "[There's currently no synopsis for this anime.]"}
                </p>
              </div>
            </div>
          </div>
          <div className="character-section d-flex flex-column justify-content-start custom-container">
            <div className="d-flex flex-row">
              <h1>Characters &&nbsp;</h1>
              <h1 className="text--blue">Voice Actors</h1>
            </div>
            <div className="character-section__cards">
              <div className="row row-cols-3">
                {anime.characters.map((character, idx) =>
                  idx < characterCount ? (
                    <CharacterCard character={character} />
                  ) : (
                    <></>
                  )
                )}
              </div>
            </div>
            {characterCount < anime.characters.length ? (
              <button
                className="d-flex flex-row align-items-center load-button"
                onClick={loadCharacter}
              >
                <FontAwesomeIcon
                  icon={["fas", "chevron-down"]}
                  style={{ color: "#44C1E9" }}
                />
                <p>Load More</p>
              </button>
            ) : (
              <button
                className="d-flex flex-row align-items-center load-button"
                onClick={hideCharacter}
              >
                <FontAwesomeIcon
                  icon={["fas", "chevron-up"]}
                  style={{ color: "#44C1E9" }}
                />
                <p>Hide</p>
              </button>
            )}
          </div>

          <div className="d-flex flex-column review-section custom-container">
            <h1>Review</h1>
            <div className="review-section__review d-flex flex-column">
              {reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </div>
            <button className="d-flex flex-row align-items-center load-button">
              <FontAwesomeIcon
                icon={["fas", "chevron-down"]}
                style={{ color: "#44C1E9" }}
              />
              <p>Load More</p>
            </button>
          </div>

          <div className="recommendation-section custom-container d-flex flex-column">
            <div className="d-flex flex-row">
              <h1>More&nbsp;</h1>
              <h1 className="text--blue">Like&nbsp;</h1>
              <h1>This</h1>
            </div>
            <div className="recommendation-section__cards">
              <Carousel
                swipeable={false}
                className="card-wrapper"
                draggable={true}
                partialVisbile={false}
                responsive={responsive}
                containerClass="carousel-container"
                itemClass="carousel-item-padding-40-px"
              >
                {anime.recommendations.map((recommendation) => (
                  <AnimeCard anime={recommendation} type={"recommendation"} source={"detail"} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DetailPage;
