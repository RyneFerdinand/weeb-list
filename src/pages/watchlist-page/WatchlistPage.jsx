import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import WatchlistContent from "./WatchlistContent";
import "./WatchlistPageStyle.css";

function WatchlistPage(props) {
  let userID = localStorage.getItem("userID");
  const [watchlist, setWatchlist] = useState(() => []);

  const history = useHistory();


  const getWatchlist = async () => {
    try {
      let watchlistData = await axios.post(
        "http://localhost:8080/watchlist/view",
        {
          userID: userID,
        }
      );
      setWatchlist(watchlistData.data);
    } catch (error) {}
  };

  const rerenderPage = (id) => {
    let updatedWatchlist = [];
    watchlist.forEach((wl) => {
      if (wl.watchlist._id !== id) {
        updatedWatchlist.push(wl);
      }
    });
    setWatchlist(updatedWatchlist);
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  return (
    <div className="watchlist-page-wrapper">
      <div className="watchlist-page d-flex flex-column">
        <div className="watchlist__title">
          <span className="watchlist__first-title">My </span>
          <span className="watchlist__second-title">Watchlist</span>
        </div>
        <div className="watchlist d-flex flex-column">
          <div className="watchlist-header">
            <div>Title</div>
            <div>Status</div>
            <div>My Rating</div>
            <div className="watchlist-delete"></div>
          </div>
          {watchlist.map((watchlist) => {
            return (
              <WatchlistContent
                key={watchlist.anime.id}
                animeId={watchlist.anime.id}
                watchlistId={watchlist.watchlist._id}
                watchlistTitle={watchlist.anime.title}
                watchlistStatus={watchlist.watchlist.status}
                watchlistRating={
                  watchlist.rating ? watchlist.rating.rating : -1
                }
                watchlistImage={watchlist.anime.main_picture.large}
                rerenderFunction={rerenderPage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WatchlistPage;
