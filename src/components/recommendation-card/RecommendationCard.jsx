import "./recommendationCard.css"

function RecommendationCard(props){
    return(
        <div className="recommendation-card d-flex flex-column">
            <div className="recommendation-card__poster">
                <img src={props.recommendation.poster} alt="" />
            </div>
            <h5 className="recommendation-card__title">{props.recommendation.title}</h5>
        </div>
    )
}

export default RecommendationCard