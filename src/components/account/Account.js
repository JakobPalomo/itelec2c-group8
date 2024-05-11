import Profile from "./Profile";
import "../../styles/Account.css";
import { Link } from "react-router-dom";
import PalengkeItem from "../homepage/PalengkeItem";
import palengkeData from "../../data/palengkeData";
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
        <center>
          {palengkeData.slice(0, 1).map((palengke) => (
            <Link
              to={`/palengke/${palengke.palengke_id}`}
              key={palengke.palengke_id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <PalengkeItem palengke={palengke} type={"50%"} marg={"0"} />
            </Link>
          ))}
        </center>
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
