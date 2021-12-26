import './SearchQueryCard.css'
import { Link } from "react-router-dom"

function SearchQueryCard(props){
    return(
        <Link to={ `/anime/${props.data.mal_id}` } style={{ textDecoration:"none" }}>
            <div className="search-card d-flex flex-row align-items-center">
                <img src={ props.data.image_url } alt="" />
                <p>{props.data.title}</p>
            </div>

        </Link>
    )
}

export default SearchQueryCard