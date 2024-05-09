import Profile from "./Profile";
import "../../styles/Account.css";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Account({ ...sharedProps }) {
  return (
    <>
      <Profile />
      <div className="recent">
        <div className="title">
          <h1>My Recent Contribution</h1>
          <Link className="links" to="/account/contributions">
            See All <ArrowForwardIosIcon sx={{ fontSize: "13px" }} />
          </Link>
        </div>
        <div className="title">
          <h1>My Recent Reviews</h1>
          <Link className="links" to="/account/reviews">
            See All <ArrowForwardIosIcon sx={{ fontSize: "13px" }} />
          </Link>
        </div>
      </div>
    </>
  );
}
