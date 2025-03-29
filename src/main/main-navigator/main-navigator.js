import React from "react";
import "bootstrap/js/dist/modal";
import "../../theme/theme.css";

import Credits from "../main-credits/credits";

const Mainnav = () => {
  return (
    <div className=" d-flex flex-column align-items-center justify-content-center"
      style={{ height: "85vh" }}
    >
      <a href="login" className="text-center main-link">
       login
      </a>{" "}
      {/* Added text-center class */}
      <a href="signup2" className="text-center main-link">
        sign up 
      </a>{" "}
      {/* Added text-center class */}
      <a href="#" className="text-center main-link">
        donate
      </a>{" "}
      {/* Added text-center class */}
    </div>
  );
};

export default Mainnav;
