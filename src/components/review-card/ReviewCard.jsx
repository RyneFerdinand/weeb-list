import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ReviewCard.css";

function ReviewCard(props) {
  let description = props.review.description;
  const [reviewScore, setReviewScore] = useState(() => props.review.score);
  const ratingScore = ["-", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [userID, setUserID] = useState(() => "");
  const [username, setUsername] = useState(() => "");
  const [profile, setProfile] = useState(() => "");
  const animeID = props.animeID;

  const getUserData = async () => {
    try {
      let userID = await axios.get("http://localhost:8080/id");
      setUserID(userID.data);
      let user = await axios.post("http://localhost:8080/id", {
        userId: props.review.userID,
      });
      setUsername(user.data.username);
      setProfile(user.data.profileImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateReview = async () => {
    if (
      reviewScore === -1 ||
      reviewScore === "-" ||
      description.trim().length === 0
    ) {
      return;
    }

    let URL = "http://localhost:8080/rating/update";

    try {
      console.log(
        userID + " " + animeID + " " + description + " " + reviewScore
      );
      let review = await axios.patch(URL, {
        userID: userID,
        animeID: animeID,
        description: description,
        rating: reviewScore,
      });

      console.log("REVIEW");
      console.log(review);
      props.updateState(review.data, "update");
    } catch (error) {}
  };

  const removeReview = async () => {
    let URL = "http://localhost:8080/rating/delete";
    try {
      await axios.delete(URL, {
        data: {
          id: props.review._id,
        },
      });
      props.updateState(props.review, "delete");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column review-wrapper">
      <div className="d-flex flex-row review">
        <img src={profile} alt="" className="review__profile" />
        <div className="d-flex flex-column review__data">
          <div className="upper-review d-flex flex-row align-items-center justify-content-between">
            <h4>{username}</h4>
            {props.review.userID === userID ? (
              <div className="update-buttons d-flex-flex-row align-items-center">
                <FontAwesomeIcon
                  data-bs-toggle="modal"
                  data-bs-target="#editReview"
                  onClick={() => {
                    document.querySelector("textarea").value = description;
                  }}
                  icon={["fas", "edit"]}
                  style={{
                    color: "#4489DE",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    marginRight: "0.5em",
                  }}
                />
                <FontAwesomeIcon
                  icon={["fa", "trash"]}
                  style={{
                    color: "#4489DE",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  onClick={removeReview}
                />
              </div>
            ) : (
              <></>
            )}
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
                        value={reviewScore}
                        onClick={(e) => {
                          setReviewScore(e.target.value);
                        }}
                      >
                        {ratingScore.map((score) => (
                          <option value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <h7 className="text--white">Description:</h7>
                    <textarea
                      name=""
                      id=""
                      rows="10"
                      onChange={(e) => {
                        description = e.target.value;
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
                      onClick={updateReview}
                      data-bs-dismiss="modal"
                    >
                      Update Review
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
