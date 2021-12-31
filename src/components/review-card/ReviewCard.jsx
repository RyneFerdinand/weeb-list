import "./ReviewCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReviewCard(props) {
  let pfp = [
    "https://static.zerochan.net/Texas.%28Arknights%29.full.2824483.jpg",
    "https://preview.redd.it/1fd85j0at0f41.jpg?width=640&crop=smart&auto=webp&s=68c17507d15479937b184c4f9f6c5e86aea79f7f",
    "https://cdn.donmai.us/original/ff/21/ff213428946865341e1e25c9852c0487.jpg",
  ];

  return (
    <div className="d-flex flex-column review-wrapper">
      <div className="d-flex flex-row review">
        <img
          src={pfp[Math.floor(Math.random() * 3)]}
          alt=""
          className="review__profile"
        />
        <div className="d-flex flex-column review__data">
          <div className="upper-review d-flex flex-row align-items-center justify-content-between">
            <h4>{"Hans"}</h4>
            <div className="d-flex-flex-row align-items-center">
                <FontAwesomeIcon
                data-bs-toggle="modal"
                data-bs-target="#editReview"
                icon={["fas", "edit"]}
                style={{ color: "#4489DE", fontSize: "1.5rem" }}
                />
                <FontAwesomeIcon
                data-bs-toggle="modal"
                data-bs-target="#editReview"
                icon={["fa", "trash"]}
                style={{ color: "#4489DE", fontSize: "1.5rem" }}
                />
            </div>
            <div
              class="modal fade"
              id="editReview"
              tabindex="-1"
              aria-labelledby="reviewModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="custom-modal modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title text--blue" id="reviewModalLabel">
                      Review
                    </h5>
                    <button
                      type="button"
                      class="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="custom-body modal-body d-flex flex-column">
                    <div className="score-section d-flex flex-row align-items-center">
                      <h7 className="text--white">Rating: </h7>
                      <select
                        name="score-select"
                        class="score-cbo"
                        onClick={(e) => {
                        }}
                      >
                        {/* {ratingScore.map((score) => (
                          <option value={score}>{score}</option>
                        ))} */}
                      </select>
                    </div>
                    <h7 className="text--white">Description:</h7>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      onChange={(e) => {
                        // description = e.target.value;
                      }}
                    ></textarea>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                    //   onClick={addReview}
                    >
                      Add Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p>{props.review.description}</p>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center review__rating">
        <p>Overall Rating: </p>
        <div className="d-flex flex-row align-items-center rating">
          <FontAwesomeIcon
            icon={["fas", "star"]}
            style={{ color: "#E4C44F" }}
          />
          <p>{props.review.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
