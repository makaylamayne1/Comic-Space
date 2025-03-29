import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Comic = () => {
  const location = useLocation();
  const searchContent = location.state?.searchContent; // Ensure to check for the specific state passed
  const navigate = useNavigate();
  if (!searchContent || searchContent.length === 0) {
    return <div>No comics found or no data provided.</div>;
  }

  const navigateToComic = (fileUrl, title) => {
    return () => {
      localStorage.setItem("fileUrl", fileUrl);
      localStorage.setItem("title", title);
      navigate("/view/viewerstyled");
    };
  };

  return (
    <div>
      {searchContent.map((item, index) => (
        <div key={index}>
          {" "}
          <h1>{item.title}</h1>
          <img src={item.fileUrl} alt={`Comic titled ${item.title}`} />
          <label>By {item.username}</label>
          <button onClick={navigateToComic(item.fileUrl, item.title)}>
            go to this comic
          </button>
        </div>
      ))}
    </div>
  );
};

export default Comic;
