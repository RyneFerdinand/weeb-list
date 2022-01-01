import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import WatchlistButton from "../watchlist-button/WatchlistButton";
import "./AnimeCard.css";

function AnimeCard(props) {
  let id;
  let link;

  if (props.loading === false) {
    id = props.source === "mal" ? props.anime.id : props.anime.mal_id;
    link = `/anime/${id}`;
  }

  return (
    <div className="anime-card d-flex flex-column">
      {props.loading === false ? (
        <div>
          <Link to={link} style={{ textDecoration: "none" }}>
            <div className="anime-card__poster">
              <img
                src={
                  props.source === "mal"
                    ? props.anime.main_picture.large
                    : props.anime.image_url
                }
                alt=""
              />
            </div>
          </Link>
          <div
            className={
              props.type === "search"
                ? "anime-card__title-wrapper--large d-flex flex-column justify-content-between"
                : "anime-card__title-wrapper--small d-flex flex-column justify-content-between"
            }
          >
            <p className="anime-card__title">{props.anime.title}</p>
            {props.type === "search" ? (
              <div className="anime-card__bottom d-flex flex-column">
                <div className="search-card__type">
                  <FontAwesomeIcon
                    icon={["fas", "tv"]}
                    style={{ color: "#44B9DE" }}
                  />
                  &nbsp;&nbsp;{props.anime.type}
                </div>
                <WatchlistButton size={"small"} id={id} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="skeleton skeleton-container d-flex flex-column justify-content-end">
            <div className="skeleton-text-container d-flex flex-column">
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
            </div>
        </div>
      )}
    </div>
  );
}

export default AnimeCard;
