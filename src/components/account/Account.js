import Profile from "./Profile";
import "../../styles/Account.css";
import PalengkeItem from "../homepage/PalengkeItem.js";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import palengkeData from "../../data/palengkeData";

export default function Account({ ...sharedProps }) {
  return (
    <>
      <Profile />
      <div className="recent">
        <div className="title">
          <h1>My Recent Contribution</h1>
          {palengkeData.slice(0, 1).map((palengke) => (
            <Link
              to={`/palengke/${palengke.palengke_id}`}
              key={palengke.palengke_id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <PalengkeItem
                palengke={palengke}
                type={"80%"}
                min={"900px"}
                marg={"none"}
              />
            </Link>
          ))}

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
