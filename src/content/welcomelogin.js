import React from "react";
import Navigation from "./navigation/navigation";
import Upload from "./upload/upload";
import Display from "./display/display";
import ChooseChapter from "./chapterdivision/choosechapter";
const WelcomeLogin = () => {
  return (
    <div className={"main-theme"}>
      <Navigation></Navigation>
      <div className={"d-flex "}>
        <Display></Display>
      </div>
    </div>
  );
};

export default WelcomeLogin;
