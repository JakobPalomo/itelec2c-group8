import Profile from "./Profile";
import "../../styles/Account.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Account({ ...sharedProps }) {
  return (
    <>
      <Profile />
      <div className="recent">
        <div className="title">
          <h1>My Recent Contribution</h1>
          <h3>
            See All <ArrowForwardIosIcon sx={{ fontSize: "13px" }} />
          </h3>
        </div>
        <div className="title">
          <h1>My Recent Reviews</h1>
          <h3>
            See All <ArrowForwardIosIcon sx={{ fontSize: "13px" }} />
          </h3>
        </div>
      </div>
    </>
  );
}
