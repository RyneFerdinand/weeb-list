import "./HomePageStyle.css";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroBanner from "../../components/hero-banner/HeroBanner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AnimeCard from "../../components/anime-card/AnimeCard";

function HomePage() {
  const [anime, setAnime] = useState(async () => []);
  const [fetchProgress, setFetchProgress] = useState(()=>0);

  const mainCarousel = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const cardCarousel = {
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

  const getHomeAnime = async () => {
    let API_URL = "http://localhost:8080/anime/home";
    console.log("masuk")
    try {
      let tempAnimeList = await axios.post(API_URL, {
        userID: localStorage.getItem("userID"),
        onDownloadProgress: (progressEvent) => {
          setFetchProgress(
            Math.floor((progressEvent.loaded / progressEvent.total) * 100)
          );
          console.log(fetchProgress);
        },
      });
      setAnime(tempAnimeList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeAnime();
  }, []);

  return (
    <div className="home-page">
      {typeof anime.carousel !== typeof undefined ? (
        <div>
          <Carousel
            swipeable={false}
            autoPlay={true}
            showDots={false}
            draggable={false}
            infinite={true}
            autoPlaySpeed={1000}
            transitionDuration={1000}
            partialVisbile={false}
            arrows={false}
            responsive={mainCarousel}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {anime.carousel.map((anime, idx) => (
              <HeroBanner
                alignment={idx % 2 === 0 ? "left" : "right"}
                mal_id={anime.mal_id}
                firstTitle={anime.firstTitle}
                secondTitle={anime.secondTitle}
                animeTitle={anime.title}
                animeRating={anime.rating}
                animeGenre={anime.genre}
                animeShow={anime.show}
                animeDescription={anime.description}
                image={anime.image}
              />
            ))}
          </Carousel>
          <div className="recommendation-section custom-container">
            <div className="d-flex flex-row">
              <h1>Anime</h1>&emsp;
              <h1 className="text--blue">Recommendations</h1>
            </div>
            <Carousel
              swipeable={false}
              className="card-wrapper"
              draggable={false}
              partialVisbile={false}
              responsive={cardCarousel}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {anime.recommendation.map((recommendation) => (
                <AnimeCard
                  anime={recommendation}
                  type={"recommendation"}
                  source={"mal"}
                  loading={false}
                />
              ))}
            </Carousel>
          </div>
          <div className="seasonal-section custom-container">
            <div className="d-flex flex-row">
              <h1>Seasonal</h1>&emsp;
              <h1 className="text--blue">Anime</h1>
            </div>
            <Carousel
              swipeable={false}
              className="card-wrapper"
              draggable={false}
              partialVisbile={false}
              responsive={cardCarousel}
              containerClass="carousel-container"
              itemClass="carousel-item-padding-40-px"
            >
              {anime.seasonal.map((seasonal) => (
                <AnimeCard
                  anime={seasonal.node}
                  type={"recommendation"}
                  source={"mal"}
                  loading={false}
                />
              ))}
            </Carousel>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
