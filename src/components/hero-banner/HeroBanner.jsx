import "./HeroBanner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WatchlistButton from "../watchlist-button/WatchlistButton";
import { Link } from "react-router-dom";

function HeroBanner(props) {
  return (
    <div className="banner-container">
      {props.alignment === "left" ? (
        <div className="banner d-flex flex-column">
          <div className="d-flex flex-row align-items-center">
            <div className="detail d-flex flex-column justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <h1 className="title title--left">{props.firstTitle} </h1>
                <h1 className="title title--left text--blue">
                  {props.secondTitle}
                </h1>
              </div>
              <div className="anime-title">{props.animeTitle}</div>
              <div className="anime-show">
                <FontAwesomeIcon
                  icon={["fas", "tv"]}
                  style={{ color: "#44B9DE" }}
                />
                &nbsp;&nbsp;{props.animeShow} &emsp;{" "}
                <span className="text--blue">{props.animeGenre}</span>
              </div>
              <div className="anime-description">{props.animeDescription}</div>
              <div className="bottom-detail d-flex flex-row">
                <WatchlistButton size={"large"} />
                <Link to={`/anime/${props.mal_id}`} className="more-link">
                  <button className="more-button">
                    More &emsp;{" "}
                    <FontAwesomeIcon
                      icon={["fas", "chevron-right"]}
                      style={{ color: "#44B9DE" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
            <div
              className="anime-background"
              style={{ backgroundImage: `url(${props.image})` }}
            >
              <div className="first-transparent-image"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="banner d-flex flex-column">
          <div className="d-flex flex-row align-items-center">
            <div
              className="anime-background"
              style={{ backgroundImage: `url(${props.image})` }}
            >
              <div className="second-transparent-image"></div>
            </div>
            <div className="detail d-flex flex-column justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <h1 className="title">{props.firstTitle} </h1>
                <h1 className="title title--right text--blue">
                  {props.secondTitle}
                </h1>
              </div>
              <div className="anime-title">{props.animeTitle}</div>
              <div className="anime-show">
                <FontAwesomeIcon
                  icon={["fas", "tv"]}
                  style={{ color: "#44B9DE" }}
                />
                &nbsp;&nbsp;{props.animeShow} &emsp;{" "}
                <span className="text--blue">{props.animeGenre}</span>
              </div>
              <div className="anime-description">{props.animeDescription}</div>
              <div className="bottom-detail d-flex flex-row">
                <WatchlistButton size={"large"} />
                <Link to={`/anime/${props.mal_id}`} className="more-link">
                  <button className="more-button">
                    More &emsp;{" "}
                    <FontAwesomeIcon
                      icon={["fas", "chevron-right"]}
                      style={{ color: "#44B9DE" }}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeroBanner;
