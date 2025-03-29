import React, { useState } from "react";
import "../theme/theme.css";
import GirlSmiling from "./signup-image.png";
import Canada from "./canada.png"

// logic for sign up
import signUpUser from "../server/credentials/signupuser.js";

const Signup = () => {
  // make sure they know that we do not condone theft
  const [agreeStatus, setAgreeStatus] = useState(null);
  // tell me whether they are a creator or an observer
  const [role, setRole] = useState(null);
  // username
  const [username, setUsername] = useState(null);
  // password
  const [password, setPassword] = useState(null);
  // email
  const [email, setEmail] = useState(null);
  //phone 
  const [phone,setPhone]= useState(null);

  const handleSignUp = () => {
    if(!email || !phone ||phone){
      console.error('email, phone or password cannot be empty my friend');
    }
    signUpUser(email, phone, password);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;

    if (name === "agree") {
      alert("action will be taken if you agree and proceed to steal content.");
      setAgreeStatus(checked ? "agree" : null);
    }

    if (name === "disagree") {
      alert("you have disagreed to our terms.");
      setAgreeStatus(checked ? "disagree" : null);
    }

    if (name === "creator") {
      alert("im so excited for you to add your content to comic space!");
      setRole(checked ? "creator" : null);
    }

    if (name === "observer") {
      alert("im so excited for you to observe on comic space!");
      setRole(checked ? "observer" : null);
    }
  };

  const handleChangeText = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "email") {
      setEmail(value);
    }

    if (name === "phone") {
      setPhone(value);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center main-theme" style={{ height: "110vh" }}>
      <h2 className="text-center">signup</h2>
      <form>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={Canada} alt="Description" className="w-25 h-25 rounded-circle" />
        </div>

        <label>
          do you agree to respect people on this website and not steal or distribute stolen content?
        </label>

        <div className="d-flex justify-content-center">
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={agreeStatus === "agree"}
              onChange={handleChange}
            />
            agree
          </label>

          <label>
            <input
              type="checkbox"
              name="disagree"
              checked={agreeStatus === "disagree"}
              onChange={handleChange}
            />
            disagree
          </label>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <label>what are you?</label>
        </div>

        <div className="d-flex justify-content-center">
          <label>
            creator
            <input
              type="checkbox"
              name="creator"
              checked={role === "creator"}
              onChange={handleChange}
            />
          </label>

          <label>
            observer
            <input
              type="checkbox"
              name="observer"
              checked={role === "observer"}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <label>
            username
            <input type="text" name="username" onChange={handleChangeText} />
          </label>
          <label>
            password
            <input type="password" name="password" onChange={handleChangeText} />
          </label>
          <label>
            email
            <input type="text" name="email" onChange={handleChangeText} />
          </label>
          <label>
            phone
            <input type="text" name="phone" onChange={handleChangeText} />
          </label>
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center">
          <button
            type="button"
            className="btn btn-block btn-lg mt-2"
            style={{
              maxWidth: "100%",
              borderRadius: "8em",
              background: "#B9D8F2",
            }}
            onClick={handleSignUp}
          >
            signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
