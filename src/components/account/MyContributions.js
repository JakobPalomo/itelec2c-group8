import "../../styles/MyContributions.css";
import PalengkeItem from "../homepage/PalengkeItem";
import palengkeData from "../../data/palengkeData";
import { Link } from "react-router-dom";

function MyContributions({ ...sharedProps }) {
  return (
    <div className="contributions">
      <h1 sx={{ margin: "10px" }}>My Contributions</h1>
      {palengkeData.slice(0, 1).map((palengke) => (

        <Link
          to={`/palengke/${palengke.palengke_id}`}
          key={palengke.palengke_id}
          style={{ textDecoration: "none", color: "black" }}
        >
          
          <PalengkeItem
            palengke={palengke}
            showIcons={true}
            type={"45%"}
            min={"900px"}
            marg={"0"}
            mediaList={sharedProps.mediaList}
          />
        </Link>
      ))}
    </div>
  );
}

export default MyContributions;
