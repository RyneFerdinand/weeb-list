import "./ReviewCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ReviewCard(props){

    let pfp = [
        "https://static.zerochan.net/Texas.%28Arknights%29.full.2824483.jpg",
        "https://preview.redd.it/1fd85j0at0f41.jpg?width=640&crop=smart&auto=webp&s=68c17507d15479937b184c4f9f6c5e86aea79f7f",
        "https://cdn.donmai.us/original/ff/21/ff213428946865341e1e25c9852c0487.jpg"
    ]

    return(
       <div className="d-flex flex-column review-wrapper">
           <div className="d-flex flex-row review">
               <img src={pfp[Math.floor(Math.random() * 3)]} alt="" className="review__profile"/>
               <div className="d-flex flex-column review__data">
                   <h4>{"Hans"}</h4>
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