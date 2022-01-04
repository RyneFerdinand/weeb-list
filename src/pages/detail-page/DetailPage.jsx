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
import WatchlistButton from "../../components/watchlist-button/WatchlistButton";

function DetailPage() {
  let { id } = useParams();
  const [animeId, setAnimeId] = useState(() => "");
  let query = "";
  let reviewScore = -1;
  let description = "";
  let currID = localStorage.getItem("userID");

  const [anime, setAnime] = useState(() => []);
  const [review, setReview] = useState(() => []);
  const [fetchStatus, setFetchStatus] = useState(() => true);
  const [characterCount, setCharacterCount] = useState(() => 6);
  const [fetchProgress, setFetchProgress] = useState(() => 0);
  const [reviewed, setReviewed] = useState(() => false);

  if (id !== animeId) {
    setFetchStatus(true);
    setAnime({});
    setAnimeId(id);
  }

  let ratingScore = ["-", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  useEffect(() => {
    const getAnime = async () => {
      let URL = "http://localhost:8080/rating/view";
      try {
        const reviews = await axios.post(URL, {
          animeID: animeId,
        });
        reviews.data.forEach((review) => {
          if (review.userID === currID) {
            setReviewed(true);
          }
        });
        setReview(reviews.data);
      } catch (error) {}

      let API_URL = "http://localhost:8080/anime/" + animeId;
      try {
        const anime = await axios.get(API_URL, {
          onDownloadProgress: (progressEvent) => {
            setFetchProgress(
              Math.floor((progressEvent.loaded / progressEvent.total) * 100)
            );
          },
        });
        setAnime(anime.data);
        setFetchStatus(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAnime();
  }, [query, animeId]);

  const addReview = async () => {
    if (reviewScore === -1 || description.trim().length === 0) {
      return;
    }

    document.querySelector("textarea").value = "";
    document.querySelector("select").value = "-";
    document.getElementById("reviewModal").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((bd) => bd.classList.remove("modal-backdrop"));

    let URL = "http://localhost:8080/rating/add";
    try {
      const review = await axios.post(URL, {
        userID: currID,
        animeID: animeId,
        description: description,
        rating: reviewScore,
      });
      setReview((prevReview) => {
        return [...prevReview, review.data];
      });
      setReviewed(true);
    } catch (error) {}
  };

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

  const updateReviewState = (newReview, action) => {
    let updatedReviews = [];
    if(action === "update"){
      review.forEach((rev) => {
        if (rev._id !== newReview._id) {
          updatedReviews.push(rev);
        } else {
          updatedReviews.push(newReview);
        }
      });
    } else {
      review.forEach((rev) => {
        if (rev._id !== newReview._id) {
          updatedReviews.push(rev);
        }
      });
      description = "";
      ratingScore = -1;
      setReviewed(false);
    }
    setReview(updatedReviews);
  };

  return (
    <div key={id} className="detail-page">
      <LoadingBar
        color="#44B9DE"
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
              <WatchlistButton source={"detail"} id={id} />
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
              <h1>Characters &nbsp;</h1>
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
              {review.map((review) => (
                <ReviewCard
                  review={review}
                  animeID={animeId}
                  updateState={updateReviewState}
                />
              ))}
            </div>
            <div className="review-buttons d-flex flex-row align-items-center justify-content-center">
              {review.length > 0 ?
                <button className="d-flex flex-row align-items-center load-button">
                  <FontAwesomeIcon
                    icon={["fas", "chevron-down"]}
                    style={{ color: "#44C1E9" }}
                  />
                  <p>Load More</p>
                </button>:
                <></>
              }
              {reviewed === true ? (
                <></>
              ) : (
                <button
                  type="button"
                  className="d-flex flex-row align-items-center load-button"
                  data-bs-toggle="modal"
                  data-bs-target="#reviewModal"
                >
                  <FontAwesomeIcon
                    icon={["fas", "plus"]}
                    style={{ color: "#44C1E9" }}
                  />
                  <p>Add Review</p>
                </button>
              )}
            </div>
          </div>
          <div
            class="modal fade"
            id="reviewModal"
            tabindex="-1"
            aria-labelledby="reviewModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="custom-modal modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text--blue" id="reviewModalLabel">
                    Review
                  </h5>
                  <button
                    type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="custom-body modal-body d-flex flex-column">
                  <div className="score-section d-flex flex-row align-items-center">
                    <h7 className="text--white">Rating: </h7>
                    <select
                      name="score-select"
                      class="score-cbo"
                      onClick={(e) => {
                        reviewScore =
                          e.target.value !== "-" ? e.target.value : -1;
                      }}
                    >
                      {ratingScore.map((score) => (
                        <option value={score}>{score}</option>
                      ))}
                    </select>
                  </div>
                  <h7 className="text--white">Description:</h7>
                  <textarea
                    name=""
                    id=""
                    rows="10"
                    onChange={(e) => {
                      description = e.target.value;
                    }}
                  ></textarea>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={addReview}
                  >
                    Add Review
                  </button>
                </div>
              </div>
            </div>
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
                  <AnimeCard
                    anime={recommendation}
                    loading={false}
                    type={"recommendation"}
                    source={"mal"}
                  />
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
