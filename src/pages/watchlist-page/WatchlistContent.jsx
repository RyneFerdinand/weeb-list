import WatchlistDelete from "./WatchlistDelete"

function WatchlistContent(props){
    let watchlistRating = props.watchlistRating
    if (watchlistRating === "Add Rating"){
        watchlistRating = <div><i className="fas fa-plus"></i>&nbsp;{watchlistRating}</div>
    }
    else {
        watchlistRating = <div><i className="fas fa-star"></i>&nbsp;{watchlistRating}</div>
    }
    return (
        <div className="watchlist-content">
            <div className="watchlist-title">
                <img src={props.watchlistImage}/>
                <div>
                    &nbsp; {props.watchlistTitle}
                </div>
            </div>
            <div className="watchlist-status">
                {props.watchlistStatus}
            </div>
            <div className="watchlist-rating">
                {watchlistRating}
            </div>
            <WatchlistDelete/>
        </div>
    )
}

export default WatchlistContent