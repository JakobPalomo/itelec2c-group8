import React from "react";
import "../../styles/Palengke.css";
import HalfRating from "./HalfRating.js";

function Review() {
  return (
    <div className="Reviews">
      <p>Jan 20, 2024</p>
      <div>
        <HalfRating />
      </div>
      <p className="name">Aliah Esteban</p>
      <p>
        Working at Sam.AI has been an incredible journey so far. The technology
        we're building is truly cutting-edge, and being a part of a team that's
        revolutionizing how people achieve their goals is immensely fulfilling.{" "}
      </p>
    </div>
  );
}

export default Review;
