import "../../styles/MyReviews.css";
import Review from "../palengke/Review.js";

function MyReviews({ ...sharedProps }) {
  return (
    <>
      <div className="myReviews">My Reviews Page</div>
      <div className="myreviewcontent">
        <Review />
      </div>
    </>
  );
}

export default MyReviews;
