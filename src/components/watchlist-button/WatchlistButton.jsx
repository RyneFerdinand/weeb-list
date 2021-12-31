import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useEffect, useState } from "react";
import './WatchlistButton.css'

function WatchlistButton(props){
    let userID = localStorage.getItem("userID");
    const [classData, setClassData] = useState(()=>{
        let data;
        if(props.size === "large"){
            data = "add-btn d-flex flex-row align-items-center justify-content-center";
        } else if(props.source === "detail"){
            data = "add-btn--blue d-flex flex-row align-items-center justify-content-center";
        } else {
            data = "add-btn--small d-flex flex-row align-items-center justify-content-center";
        }
        return data;
    })

    const [color, setColor] = useState(()=>{
        let data;
        if(props.size === "large"){
            data = "#44B9DE";
        } else if(props.source === "detail"){
            data = "#FFFFFF";
        } else {
            data = "#44B9DE";
        }
        return data;
    })

    
    
    const [watchlistStatus, setWatchlistStatus] = useState(()=>"");
    
    const searchWatchlist = async () => {
        try {
            let watchlist = await axios.post('http://localhost:8080/watchlist/search', {
                userID: userID,
                animeID: `${props.id}`
            })
            console.log("Anime: " + props.id);
            console.log(watchlist);
            if(watchlist.data !== null){
                setWatchlistStatus("In Watchlist")
            } else {
                setWatchlistStatus("Add to Watchlist");
            }
        } catch (error) {
            
        }

        return "Add to Watchlist"
    }

    useEffect(() => {
        console.log(searchWatchlist());
    }, [])

    const handleWatchlist = async () => {
        if(watchlistStatus === "Add to Watchlist"){
            setWatchlistStatus("In Watchlist");
            try {
                await axios.post("http://localhost:8080/watchlist/add", {
                    userID: userID,
                    animeID: `${props.id}`
                });

            } catch (error) {
            }
        } else {
            setWatchlistStatus("Add to Watchlist");
                try {
                await axios.delete("http://localhost:8080/watchlist/delete", {
                    data:{
                        userID: userID,
                        animeID: `${props.id}`
                }
                });
            } catch (error) {
                
            }
        }
    }

    return(
        <button onClick={handleWatchlist} className={classData}>
            <FontAwesomeIcon icon={['fas', 'plus']} style={{ color: color }}s/>&emsp; {watchlistStatus}
        </button>
    )
}

export default WatchlistButton