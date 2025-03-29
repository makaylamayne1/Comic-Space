import React from "react";
import SearchBar from "../searchbar/searchbar.js";

const Navigation = () => {
  return (
    <div className={"main-theme"}>
      <nav className="navbar navbar-expand-lg navigation-style">
        <ul className="navbar-nav ">
            
          <li className="nav-item p-4">
            <a className="nav-link p-4" href="#">
              <h3>your reading list</h3>
            </a>
          </li>
         
          <li className="nav-item p-4">
            <a className="nav-link p-4" href="#">
              <h3>search</h3>
            </a>
          </li>

          <li className="nav-item p-4">
            <SearchBar></SearchBar>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navigation;
