import "../../theme/theme.css";
import React from "react";
// import the sections of the application
// These components are shown when the user first logs in
import Mainnav from "../main-navigator/main-navigator.js";
import MainTitle from "../main-title/main-title.js";
import Credits from "../main-credits/credits.js";

const MainPage = () => {
  return (
    <div className={"main-theme"}>
      <MainTitle></MainTitle>
      <Mainnav></Mainnav>
      <Credits></Credits>
    </div>
  );
};

export default MainPage;
