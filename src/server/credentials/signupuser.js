import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

// Initialize CognitoUserPool
const initializeUserPool = () => {
  const poolData = {
    UserPoolId: "us-east-1_0DqUkscer",
    ClientId: "3c37kemsbl7i5t7fomr7nrad49",
  };

  const UserPool = new CognitoUserPool(poolData);
  return UserPool;
};

// Function to sign up a user
const signUpUser = (email, phone, password) => {
  const UserPool = initializeUserPool();

  // Define attributes
  const attributeList = [];

  // Add email attribute
  const emailAttribute = new CognitoUserAttribute({
    Name: "email",
    Value: email,
  });
  attributeList.push(emailAttribute);

  // Add phone number attribute
  const phoneAttribute = new CognitoUserAttribute({
    Name: "phone_number",
    Value: phone,
  });
  attributeList.push(phoneAttribute);

  UserPool.signUp(email, password, attributeList, null, (err, data) => {
    if (err) {
      console.error(err);
      console.error("Error message", err.message);
      console.error("Error code", err.code);
    } else {
      console.log("Signup successful", data);
    }
  });
};

export default signUpUser;
