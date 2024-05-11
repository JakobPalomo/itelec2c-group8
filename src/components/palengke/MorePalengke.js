import palengkeData from "../../data/palengkeData";
import { Link } from "react-router-dom";
import PalengkeItem from "../homepage/PalengkeItem.js";

function MorePalengke() {
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
        {palengkeData.slice(0, 4).map((palengke) => (
          <Link
            to={`/palengke/${palengke.palengke_id}`}
            key={palengke.palengke_id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <PalengkeItem palengke={palengke} />
          </Link>
        ))}
      </div>
    </>
  );
}

export default MorePalengke;
