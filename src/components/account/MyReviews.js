import "../../styles/MyReviews.css";
import Review from "../palengke/Review.js";
import reviewsData from "../palengke/reviewsData.json";

function MyReviews({ ...sharedProps }) {
  return (
    <>
      <div className="myReviews">My Reviews Page</div>
      <div className="bod">
        <div className="myreviewcontent">
          {sharedProps.userReviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyReviews;
