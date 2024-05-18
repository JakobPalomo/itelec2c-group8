import "../../styles/MyContributions.css";
import PalengkeItem from "../homepage/PalengkeItem";
import palengkeData from "../../data/palengkeData";
import { Link } from "react-router-dom";

function MyContributions({ ...sharedProps }) {
  return (
    <div className="contributions">
      <h1 sx={{ margin: "10px" }}>My Contributions</h1>
      <div>
        {sharedProps.userContributions.map((palengke) => (
          <Link
            to={`/palengke/${palengke.id}`}
            key={palengke.id}
            style={{
              textDecoration: "none",
              color: "black",
              pointerEvents: "auto",
            }}
          >
            <PalengkeItem
              palengke={palengke}
              showIcons={true}
              type={"45%"}
              min={"900px"}
              marg={"0"}
              mediaList={sharedProps.mediaList}
              {...sharedProps}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MyContributions;
