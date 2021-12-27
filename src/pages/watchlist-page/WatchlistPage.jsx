import WatchlistContent from "./WatchlistContent"
import './WatchlistPageStyle.css'

function WatchlistPage(){
    let watchlists = [
        {
            "mal_id": 44511,
            "title": "Chainsaw Man",
            "status": "Planned",
            "rating": "Add Rating",
            "image": "https://cdn.myanimelist.net/images/anime/1632/110707.jpg"
        },
        {
            "mal_id": 48926,
            "title": "Komi-san wa, Comyushou desu.",
            "status": "Watching",
            "rating": "8.5",
            "image": "https://cdn.myanimelist.net/images/anime/1899/117237.jpg"
        },
        {
            "mal_id": 48561,
            "title": "Jujutsu Kaisen 0 Movie",
            "status": "Finished",
            "rating": "Add Rating",
            "image": "https://cdn.myanimelist.net/images/anime/1121/119044.jpg"
        }
    ]
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
                    {watchlists.map((watchlist) => {
                        return (
                            <WatchlistContent
                                key={watchlist.mal_id}
                                watchlistId={watchlist.mal_id}
                                watchlistTitle={watchlist.title}
                                watchlistStatus={watchlist.status}
                                watchlistRating={watchlist.rating}
                                watchlistImage={watchlist.image}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default WatchlistPage