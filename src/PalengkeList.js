import React from "react";
import PalengkeItem from "./PalengkeItem";
import palengkeData from "./palengkeData";
import "./PalengkeList.css";

function PalengkeList() {
  return (
    <div className="palengke-list-container">
      <div className="palengke-list">
        {palengkeData.map((palengke) => (
          <PalengkeItem palengke={palengke} />
        ))}
      </div>
    </div>
  );
}

export default PalengkeList;
