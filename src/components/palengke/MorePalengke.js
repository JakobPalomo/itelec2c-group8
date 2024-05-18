import React, { useState, useEffect } from "react";

import palengkeData from "../../data/palengkeData";
import { Link } from "react-router-dom";
import PalengkeItem from "../homepage/PalengkeItem.js";

function MorePalengke({ ...sharedProps }) {
  const [numOfPalengkeToShow, setNumOfPalengkeToShow] = useState(3);

  return (
    <>
      <div className="head">
        <div className="fifty">
          <h1>More Palengke</h1>
        </div>
        {sharedProps.palengkeList.length > numOfPalengkeToShow &&
          sharedProps.palengkeList.length !== 0 && (
            <div className="fifty" style={{ textAlign: "right" }}>
              <div className="more">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setNumOfPalengkeToShow((prev) => (prev += 6))}
                >
                  Show More ...
                </span>
              </div>
            </div>
          )}
      </div>

      <div className="palengkeItemsContainer">
        {sharedProps.palengkeList
          .slice(0, numOfPalengkeToShow)
          .map((palengke) => (
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
