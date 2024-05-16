import palengkeData from "../../data/palengkeData";
import { Link } from "react-router-dom";
import PalengkeItem from "../homepage/PalengkeItem.js";

function MorePalengke({ ...sharedProps }) {
  return (
    <>
      <br></br>
      <div className="head">
        <div className="fifty">
          <h1>More Palengke</h1>
        </div>
        <div className="fifty" style={{ paddingTop: "24px" }}>
          <a href="#" className="more" style={{ marginLeft: "70%" }}>
            Show More ...
          </a>
        </div>
      </div>

      <div className="palengkeItemsContainer">
        <br></br>
        {sharedProps.palengkeList.slice(0, 4).map((palengke) => (
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
              mediaList={sharedProps.mediaList}
              {...sharedProps}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default MorePalengke;
