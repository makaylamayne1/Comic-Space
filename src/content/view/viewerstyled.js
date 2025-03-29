import React from "react";
import View from "./view";
import { useNavigate } from "react-router-dom";


const ViewerStyled = () => {
  const fileUrl = localStorage.getItem("fileUrl"); // Ensure key matches the one used in Display component
  const navigate = useNavigate();

  const back = () => {
    navigate('../../welcomelogin')
  }

  const fullComic = () =>{
    navigate('/fullcomic');
  }



  alert(fileUrl)
  return (
    <div>
        <button onClick={back}>back to search</button>
        
        <button onClick={fullComic}>go to full comic</button>
        <h2>First Chapter ONLY</h2>
  
        <p>{fileUrl}</p>
      {fileUrl ? (
        <View fileUrl={fileUrl} />
      ) : (
        <p>No file selected or file does not exist.</p>
      )}
    </div>
  );
};

export default ViewerStyled;
