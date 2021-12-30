import axios from "axios";
import { useEffect, useState } from "react";
import WatchlistContent from "./WatchlistContent"
import './WatchlistPageStyle.css'

function WatchlistPage(){
    
    const [watchlist, setWatchlist] = useState(()=> []);

    const getWatchlist = async () => {
        try {
            let watchlistData = await axios.post("http://localhost:8080/watchlist/view", {
                userID: "1"
            });
            console.log(watchlistData.data);
            setWatchlist(watchlistData.data);
        } catch (error) {
        }
    }

    const rerenderPage = (id) => {
        let updatedWatchlist = [];
        watchlist.forEach(wl => {
            console.log(wl.watchlist._id + " " + id);
            if(wl.watchlist._id !== id){
                updatedWatchlist.push(wl);
            }
        });
        setWatchlist(updatedWatchlist);
    }

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
                                watchlistRating={5}
                                watchlistImage={watchlist.anime.main_picture.large}
                                rerenderFunction={rerenderPage}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default WatchlistPage