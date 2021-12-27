import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function WatchlistContent(props){

    let status = ["Watching", "Planned", "Finished"];
    let watchlistRating = props.watchlistRating

    if (watchlistRating === "Add Rating"){
        watchlistRating = <div><FontAwesomeIcon icon={['fas', 'plus']} style={{ color: "#44B9DE" }}/>&emsp;{watchlistRating}</div>
    }
    else {
        watchlistRating = <div><FontAwesomeIcon icon={['fas', 'star']} style={{ color: "#E4C44F" }}/>&emsp;{watchlistRating}</div>
    }
    return (
        <div className="watchlist-content">
            <img src={props.watchlistImage} alt="" className="watchlist-anime-poster"/>
            <div className="watchlist-title">&nbsp; {props.watchlistTitle}</div>
            <select className="status-select">
                {
                    status?.map((status)=>
                            status === props.watchlistStatus ? 
                            <option value={status} selected>{status}</option>
                            :<option value={status}>{status}</option>
                    )
                }
            </select>
            <div className="watchlist-rating">{watchlistRating}</div>
            <button className="delete-btn"><FontAwesomeIcon icon={['fa', 'trash']}style={{ color: "#44B9DE" }}/></button>
        </div>
    )
}

export default WatchlistContent