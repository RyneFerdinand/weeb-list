import "./recommendationCard.css"

function RecommendationCard(props){
    return(
        <div className="recommendation-card d-flex flex-column">
            <div className="recommendation-card__poster">
                    <img src={props.recommendation.poster} alt="" />
            </div>
            <div className="recommendation-card__title-wrapper">
                <p className="recommendation-card__title">{props.recommendation.title}</p>
            </div>
        </div>
    )
}

export default RecommendationCard