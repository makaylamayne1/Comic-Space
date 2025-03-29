import React from "react";
import Coffee from "./coffee.png";
import Papers from "./papers.png";

const MainTitle = () => {
  return (
    <div className="d-flex flex-row align-items-center">
      {" "}
      {/* Changed flex-column to flex-row and added align-items-center */}
      <img src={Papers} alt="papers" style={{ width: "6%", height: "6%" }} />
      <div className="pl-3">
        {" "}
        {/* Added padding-left for spacing between the image and text */}
      <h2>Comic Space</h2>
        <h5>Create and Upload your Comics</h5>
      </div>
    </div>
  );
};

export default MainTitle;
