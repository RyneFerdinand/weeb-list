import './SearchQueryCard.css'

function SearchQueryCard(props){
    return(
        <div className="search-card d-flex flex-row align-items-center" >
            <img src={ props.data.main_picture.medium } alt="" />
            <p>{props.data.title}</p>
        </div>
    )
}

export default SearchQueryCard