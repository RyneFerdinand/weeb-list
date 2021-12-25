import BottomDetail from "./BottomDetail";
import MoreDiv from "./MoreDiv";
import "./HomePageStyle.css";

function Middle(props){
    return (
        <div className="middle">
            <div className="title">
                <span className="second-title" style={{float: "right"}}>&nbsp;{props.secondTitle}</span>
                <span className="first-title" style={{float: "right"}}>{props.firstTitle}</span>
            </div>
            <div className="content">
                <div class="image" style={{backgroundImage: "url(props.image)"}}>
                    <div class="second-transparent-image"></div>
                </div>
                <div className="detail">
                    <div className="top-detail">
                        <div className="anime-title">
                            {props.animeTitle}
                        </div>
                        <div className="anime-rating-genre">
                            {props.animeGenre}
                        </div>
                        <div className="anime-show">
                            <i class="fas fa-tv"></i> {props.animeShow}
                        </div>
                        <div className="anime-date">
                            <i class="fa fa-calendar" aria-hidden="true"></i>&nbsp; {props.animeDate}
                        </div>
                        <div className="anime-description">
                            {props.animeDescription}
                        </div>
                    </div>
                    <BottomDetail/>
                </div>
            </div>
            <MoreDiv/>
        </div>
    )
}

export default Middle;