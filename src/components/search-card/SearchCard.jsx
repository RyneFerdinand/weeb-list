import { Link } from "react-router-dom"

function SearchCard(props){
    return(
        <Link to={`anime/${props.anime.mal_id}`}>
            <div className="recommendation-card d-flex flex-column">
                <div className="recommendation-card__poster">
                        <img src={props.anime.image_url} alt="" />
                </div>
                <div className="recommendation-card__title-wrapper">
                    <p className="recommendation-card__title">{props.anime.title}</p>
                </div>
            </div>
        </Link>
    )
}

export default SearchCard