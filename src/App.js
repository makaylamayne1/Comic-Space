import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./theme/theme.css";
import "bootstrap/js/dist/modal";

// import the sections of the application
import MainPage from "./main/main-page/main-page";
import Signup2 from "./signup/signup2";
import Login from "./login/login";
import PrivateRoutes from "./server/private_routes";
import WelcomeLogin from "./content/welcomelogin";

//display searched up comics
import Comic from "./content/searchbar/comic";
import ViewerStyled from "./content/view/viewerstyled";

import FullComic from "./content/chapterdivision/fullComic";
import Collections from "./content/collections/collection";

function App() {
  return (
    <Router>
      <div>{/* You can place any global components here */}</div>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup2" element={<Signup2 />} />

        {/*  <Route element={<PrivateRoutes />}> */}
          <Route path="/welcomelogin" element={<WelcomeLogin />} />
          <Route path="/comic" element={<Comic />} />
          <Route path="welcomelogin/comic" element={<Comic />} />
          <Route path="view/viewerstyled" element={<ViewerStyled />}></Route>
          <Route path="/view/viewerstyled/fullcomic" element={<FullComic></FullComic>}></Route>
         {/*</Route> */}     
         <Route path="/fullcomic" element={<FullComic></FullComic>}></Route>
        <Route path="view/collections" element={<Collections></Collections>}></Route>
        <Route path="/collections" element={<Collections></Collections>}></Route>
        {/* You can add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
