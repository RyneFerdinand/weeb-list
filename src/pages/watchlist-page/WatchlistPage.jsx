import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import WatchlistContent from "./WatchlistContent";
import "./WatchlistPageStyle.css";
import ReactLoading from "react-loading";

function WatchlistPage(props) {
  let userID;
  const [watchlist, setWatchlist] = useState(() => []);
  const [fetchStatus, setFetchStatus] = useState(() => false);

  const history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
      if (response.data.loggedIn === true) {
        props.login(true);
      } else {
        props.login(false);
        history.push("/");
      }
    });
  }, []);

  const getWatchlist = async () => {
    setFetchStatus(true);
    try {
      let user = await axios.get("http://localhost:8080/id");
      userID = user.data;

      let watchlistData = await axios.post(
        "http://localhost:8080/watchlist/view",
        {
          userID: userID,
        }
      );
      setWatchlist(watchlistData.data);
      setFetchStatus(false);
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
    <div>
      <div className="watchlist-page-wrapper">
        {fetchStatus === false ? (
          <div>
            {watchlist.length > 0 ? (
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
                  )
                </div>
              </div>
            ) : (
              <div className="empty-page d-flex flex-column align-items-center justify-content-center">
                <h4 className="text--white">Your Watchlist is Empty...</h4>
              </div>
            )}
          </div>
        ) : (
          <div className="loading-page d-flex flex-column align-items-center justify-content-center">
            <ReactLoading
              type={"cylon"}
              color={"#44B9DE"}
              width={"4rem"}
              height={"4rem"}
            />
            <h4 className="text--white">Grabbing your Watchlist...</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchlistPage;
