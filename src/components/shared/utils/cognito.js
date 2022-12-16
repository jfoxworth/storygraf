import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";
import { useHistory } from "react-router-dom";

const createPool = () => {
  console.log(process.env);
  const poolData = {
    UserPoolId: process.env.REACT_APP_UserPoolId,
    ClientId: process.env.REACT_APP_UserPoolClientId,
  };
  console.log(poolData);
  return new AmazonCognitoIdentity.CognitoUserPool(poolData);
};

const signUpUser = (username, email, password) => {
  var attributeList = [];
  var dataEmail = {
    Name: "email",
    Value: email,
  };
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );
  attributeList.push(attributeEmail);
  const CognitoUserPool = createPool();
  CognitoUserPool.signUp(
    username,
    password,
    attributeList,
    {},
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
      //      history.push("/confirm/" + cognitoUser.username);
    }
  );
};

const confirmUser = (username, confirmationNumber) => {
  const userPool = createPool();
  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(
    confirmationNumber,
    true,
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
    }
  );
};

const asyncAuthenticateUser = (cognitoUser, cognitoAuthenticationDetails) => {
  return new Promise(function (resolve, reject) {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
      newPasswordRequired: resolve,
    });
  });
};

const loginUser = async (username, password) => {
  var authenticationData = {
    Username: username,
    Password: password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var userPool = createPool();
  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  let result = await asyncAuthenticateUser(cognitoUser, authenticationDetails);

  //This gets me tokens, but what do I do with them?

  /*
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = process.env.REACT_APP_region;

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: userPool.userPoolId, // your identity pool id here
        Logins: {
          // Change the key below according to the specific region your user pool is in.
          "cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>": result
            .getIdToken()
            .getJwtToken(),
        },
      });

      //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
      AWS.config.credentials.refresh((error) => {
        if (error) {
          console.error(error);
        } else {
          // Instantiate aws sdk service objects now that the credentials have been updated.
          // example: var s3 = new AWS.S3();
          console.log("Successfully logged!");
        }
      });
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
  });
  */
};

export { createPool, signUpUser, loginUser, confirmUser };
