import React, { useState } from "react";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from "amazon-cognito-identity-js";
import GirlSmiling from "./signup-image.png";
import Canada from "./canada.png"
import Library from "./library.png";
import "../theme/theme.css";
import AWS from "aws-sdk";



const Signup2 = () => {
  //add AWS region

  // Configure AWS SDK with credentials
  AWS.config.update({
    accessKeyId: "AKIASN63OJDRIHLS6AEX",
    secretAccessKey: "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",
    region: "ca-central-1",
  });

  //we will be working with AWS cognito to store users and more
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerifyUi, setShowVerifyUi] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  //users have to verify their account to be able to log in
  const verifyCodeUI = () => {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center p-1 ">
        <input
          value={verificationCode}
          onChange={(event) => setVerificationCode(event.target.value)}
          placeholder={"Verification Code"}
          className={"mt-3"}
          required
        />
        <button
          className={"mt-2 btn btn-block  "}
          onClick={verifyCode}
          style={{
            maxWidth: "100%",
            borderRadius: "8em",
            background: "#B9D8F2",
          }}
        >
          Verify
        </button>
      </div>
    );
  };
  const verifyCode = () => {
    const userData = {
      Username: username,
      Pool: UserPool,
    };

    //registering a cognito users
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result);
        // Handle successful verification, e.g., redirect to login page
      }
    });
  };

  const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    ClientId: process.env.REACT_APP_CLIENT_ID,
  };

  //we are creating an instance of the 'CognitoUserPool' class which is used to
  //initialize our userpool with the credentials such as the UserPoolId and ClientId
  const UserPool = new CognitoUserPool(poolData);

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(
      username,
      password,
    
      [
        { Name: "email", Value: email },
        { Name: "name", Value: name },
        { Name: "preferred_username", Value: username },
        { Name: "gender", Value: gender },

      ],
      null,
      (err, data) => {
        if (err) {
          console.error(err);
          console.log(data);

          setShowVerifyUi(1);

          alert(err.message);
        } else {
          alert("Please check your email to verify the account");
          setShowVerifyUi(0);

          //in addition to having a userpool we also need to have a user group
          //in the user group we will allow users to access the S3 bucket we will use in the
          //future for uploading content and getting content

          //we are using AWS SDK modules into our code
          //we will need to create an instance of the AWS Cognito Identity Service Provider to attempt to add user to the group
          const cognito = new AWS.CognitoIdentityServiceProvider();

          //here is the details about the usergroup that we will add if the user signs up successfully
          const addToGroupParams = {
            GroupName: "star_user_group",
            UserPoolId: process.env.REACT_APP_USER_POOL_ID,
            Username: username,
          };

          cognito.adminAddUserToGroup(
            addToGroupParams,
            (addGroupErr, addGroupData) => {
              if (addGroupErr) {
                console.error("Error adding user to the group", addGroupErr);
              } else {
                console.log(
                  "User added to the group successfully:",
                  addGroupData
                );
              }
            }
          );
        }
      }
    );
  };

  return (
    <div className="main-theme" style={{ height: "100vh" }}>
      <form onSubmit={onSubmit}>
        <div className="d-flex flex-column align-items-center justify-content-center p-1 ">
          <h2>signup</h2>

          <img
            src={Library}
            alt="image of a bunch of books on a shelf"
            className=" credential-image  w-25 h-25 rounded-circle"
          />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={"Email"}
            className={"mt-2"}
            required
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={"Password"}
            className={"mt-2"}
            required
          />

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={"Name"}
            className={"mt-2"}
            required
          />

          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder={"Username"}
            className={"mt-2"}
            required
          />

          
<label>Gender</label>
    <select
      value={gender}
      onChange={(e) => {
        setGender(e.target.value);
      }}
      required
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
      <option value="prefer_not_to_say">Prefer not to say</option>
    </select>

<label>Who are you?</label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            
            <option value="one of my students">a student</option>
            <option value="colleague">colleague</option>
            <option value="researcher">researcher</option>

            <option value="interested">prefer not to say</option>
            <option value="other">other</option>
          </select>
          <button
            className={"mt-2 btn btn-block"}
            type="submit"
            style={{
              maxWidth: "100%",
              borderRadius: "8em",
              background: "white"
            }}
          >
            sign up
          </button>
        </div>
      </form>

      <div>
        {/* Conditional rendering of verifyCodeUI */}
        {showVerifyUi === 0 && verifyCodeUI()}
      </div>
    </div>
  );
};

export default Signup2;
