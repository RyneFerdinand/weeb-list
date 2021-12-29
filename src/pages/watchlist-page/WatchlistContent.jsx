import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

function WatchlistContent(props) {
  let status = ["Planned", "Watching", "Finished"];
  const [updateState, setUpdateState] = useState(false);
  let watchlistRating = props.watchlistRating;

  const removeWatchlist = async () => {
    try {
      let URL = "http://localhost:8080/watchlist/delete";
      let message = await axios.delete(URL, {
        data: {
          id: props.watchlistId,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  const updateWatchlist = async (e) => {
    try {
        let URL = "http://localhost:8080/watchlist/update";
        let message = await axios.patch(URL, {
            id: props.watchlistId,
            status: e.target.value
        });
        console.log(message);
      } catch (error) {
        console.log(error.message);
      }
  };

  if (watchlistRating === "Add Rating") {
    watchlistRating = (
      <div>
        <FontAwesomeIcon icon={["fas", "plus"]} style={{ color: "#44B9DE" }} />
        &emsp;{watchlistRating}
      </div>
    );
  } else {
    watchlistRating = (
      <div>
        <FontAwesomeIcon icon={["fas", "star"]} style={{ color: "#E4C44F" }} />
        &emsp;{watchlistRating}
      </div>
    );
  }
  return (
    <div className="watchlist-content">
      <img
        src={props.watchlistImage}
        alt=""
        className="watchlist-anime-poster"
      />
      <div className="watchlist-title">&nbsp; {props.watchlistTitle}</div>
      <select className="status-select" onChange={(e) => updateWatchlist(e)}>
        {status?.map((status) =>
          status === props.watchlistStatus ? (
            <option value={status} selected>
              {status}
            </option>
          ) : (
            <option value={status}>{status}</option>
          )
        )}
      </select>
      <div className="watchlist-rating">{watchlistRating}</div>
      <button className="delete-btn" onClick={removeWatchlist}>
        <FontAwesomeIcon icon={["fa", "trash"]} style={{ color: "#44B9DE" }} />
      </button>
    </div>
  );
}

export default WatchlistContent;
