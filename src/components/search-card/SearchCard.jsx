import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function SearchCard(props){
    console.log(props)
    return(
        <Link to={`anime/${props.anime.mal_id}`}>
            <div className="recommendation-card d-flex flex-column">
                <div className="recommendation-card__poster">
                        <img src={props.anime.image_url} alt="" />
                </div>
                <div className="recommendation-card__title-wrapper">
                    <p className="recommendation-card__title">{props.anime.title}</p>
                    {/* <div className="recommendation-card__type">
                        <FontAwesomeIcon icon={['fas', 'tv']} style={{ color: "#44B9DE" }} />
                        {props.anime.type}
                    </div> */}
                </div>
            </div>
        </Link>
    )
}

export default SearchCard