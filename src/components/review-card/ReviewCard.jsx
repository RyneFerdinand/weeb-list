import "./ReviewCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ReviewCard(props){
    return(
       <div className="d-flex flex-column review-wrapper">
           <div className="d-flex flex-row review">
               <img src={props.review.profile} alt="" className="review__profile"/>
               <div className="d-flex flex-column review__data">
                   <h4>{props.review.name}</h4>
                    <p>{props.review.description}</p>
               </div>
           </div>
           <div className="d-flex flex-row align-items-center review__rating">
                <p>Overall Rating: </p>
                <div className="d-flex flex-row align-items-center rating">
                    <FontAwesomeIcon icon={['fas', 'star']} style={{ color: "#E4C44F" }} />
                    <p>{props.review.rating}</p>
                </div>
           </div>
       </div> 
    )
}  

export default ReviewCard