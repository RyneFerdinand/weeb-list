import WatchlistContent from "./WatchlistContent"
import './WatchlistPageStyle.css'

function WatchlistPage(){
    let watchlists = [
        {
            "title": "Boruto: Naruto Next Generations",
            "status": "Finished",
            "rating": "Add Rating",
            "image": "https://picsum.photos/200/300"
        },
        {
            "title": "Takt Op. Destiny",
            "status": "Watching",
            "rating": "8.5",
            "image": "https://picsum.photos/200/300"
        },
        {
            "title": "Kimetsu no Yaiba: Mugen Ressha-hen",
            "status": "Planned",
            "rating": "Add Rating",
            "image": "https://picsum.photos/200/300"
        }
    ]
    return (
        <div>
            <div className="title">
                <span className="first-title">My </span>
                <span className="second-title">Watchlist</span>
            </div>
            <div className="watchlist">
                <div className="watchlist-header">
                    <div>Title</div>
                    <div>Status</div>
                    <div>My Rating</div>
                    <div className="watchlist-delete"></div>
                </div>
                {watchlists.map((watchlist) => {
                    return (
                        <WatchlistContent
                            watchlistTitle={watchlist.title}
                            watchlistStatus={watchlist.status}
                            watchlistRating={watchlist.rating}
                            watchlistImage={watchlist.image}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default WatchlistPage