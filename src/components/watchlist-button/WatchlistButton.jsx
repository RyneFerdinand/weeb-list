import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './WatchlistButton.css'

function WatchlistButton(props){
    return(
        <button onClick={console.log("Test")} className={props.size === "large" ? "add-btn d-flex flex-row align-items-center justify-content-center" : "add-btn--small d-flex flex-row align-items-center justify-content-center"}>
            <FontAwesomeIcon icon={['fas', 'plus']} style={{ color: "#44B9DE" }}s/>&emsp; Add to Watchlist
        </button>
    )
}

export default WatchlistButton