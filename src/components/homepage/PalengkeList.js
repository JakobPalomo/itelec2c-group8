import React from "react";
import { Link } from "react-router-dom";
import PalengkeItem from "./PalengkeItem";
import palengkeData from "../../data/palengkeData";
import HomeHeader from "./HomeHeader.js";
import "../../styles/PalengkeList.css";

function PalengkeList() {
  return (
    <div className="palengkeListContainer">
      <div className="palengkeList">
        <HomeHeader />
        <div className="palengkeItemsContainer">
          {palengkeData.map((palengke) => (
            <Link
              to={`/palengke/${palengke.palengke_id}`}
              key={palengke.palengke_id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <PalengkeItem palengke={palengke} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PalengkeList;
