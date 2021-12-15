import BottomDetail from "./BottomDetail";
import MoreDiv from "./MoreDiv";
function TopAndBottom(props){
    return (
        <div className="top">
            <div className="title">
                <span className="first-title">{props.firstTitle} </span>
                <span className="second-title">{props.secondTitle}</span>
            </div>
            <div className="content">
                <div className="detail">
                    <div className="top-detail">
                        <div className="anime-title">
                            {props.animeTitle}
                        </div>
                        <div className="anime-rating-genre">
                            <i class="fas fa-star"></i> {props.animeRating} &emsp; {props.animeGenre}
                        </div>
                        <div className="anime-show">
                            <i class="fas fa-tv"></i> {props.animeShow}
                        </div>
                        <div className="anime-description">
                            {props.animeDescription}
                        </div>
                    </div>
                    <BottomDetail/>
                </div>
                <div class="image" style={{backgroundImage: "url(props.image)"}}>
                    <div class="first-transparent-image"></div>
                </div>
            </div>
            <MoreDiv/>
        </div>
    )
}

export default TopAndBottom