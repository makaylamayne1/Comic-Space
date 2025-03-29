import React, { useState } from "react";
import "../theme/theme.css";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import loginImage from "./login-image.png";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChangeText = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
  };

  const userPool = new CognitoUserPool(poolData);

  const signIn = (e) => {
    e.preventDefault();
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      // In your Login component
      onSuccess: (session) => {
        console.log("Login successful, setting username.");
        localStorage.setItem("token", session.getIdToken().getJwtToken());
        localStorage.setItem("username", username);
        console.log(
          `Username set in localStorage: ${localStorage.getItem("username")}`
        );
        navigate("/welcomelogin");
      },
      onFailure: (error) => {
        alert("Issue with logging in");
        alert(error.message);
        console.error("Error signing in:", error);
        setErrorMessage(error.message);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // Handle new password requirements if needed
      },
    });
  };

  return (
    <div className="main-theme">
      <form>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100vh", width: "100vw" }}
        >
          <h2>login</h2>
          <img
            src={loginImage}
            alt="an image of a book open"
            className=" rounded-circle img-fluid mb-2"
          />
          <label>
            username{" "}
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChangeText}
              required
            />
          </label>
          <label>
            password{" "}
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChangeText}
              required
            />
          </label>
          <button
            type="submit"
            className="btn btn-block mt-2"
            style={{
              maxWidth: "80%",
              borderRadius: "8em",
              background: "#B9D8F2",
            }}
            onClick={signIn}
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
