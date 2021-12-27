import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './WatchlistButton.css'

function WatchlistButton(){
    return(
        <button className="add-btn d-flex flex-row align-items-center justify-content-center">
            <FontAwesomeIcon icon={['fas', 'plus']} style={{ color: "#E4C44F" }}/>&emsp; Add to Watchlist
        </button>
    )
}

export default WatchlistButton