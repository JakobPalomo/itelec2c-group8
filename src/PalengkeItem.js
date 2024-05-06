import React from "react";
import "./PalengkeList.css";
import Rating from "./Rating.js";

function PalengkeItem(props) {
  return (
    <div key={props.id} className="palengke-card">
      <div className="image-container">
        <img
          src={props.palengke.image}
          alt={props.palengke.name}
          className="palengke-image"
        />
        {/* Status icon */}
        <div className="status-icon">
          <i class="fa-solid fa-circle" style={{ color: "#00ff11" }}></i>{" "}
          <strong>Status</strong>
        </div>
      </div>
      <div className="palengke-details">
        <p>
          <Rating rating={props.palengke.rating} />
          {props.palengke.type}
        </p>
        <h3>{props.palengke.name}</h3>
        <p style={{ color: "#FD7335" }}>
          <i
            class="fa-solid fa-location-dot"
            style={{ color: "#FD7335", marginRight: "12px" }}
          ></i>
          {props.palengke.location}
        </p>
      </div>
    </div>
  );
}

export default PalengkeItem;
