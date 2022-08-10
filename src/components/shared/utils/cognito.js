import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import * as AWS from "aws-sdk/global";

const createPool = () => {
  const poolData = {
    UserPoolId: process.env.REACT_APP_UserPoolId,
    ClientId: process.env.REACT_APP_UserPoolClientId,
  };
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
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result.user;
    }
  );
};

const loginUser = (username, password) => {
  var authenticationData = {
    Username: username,
    Password: password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var userPool = createPool();
  console.log(userPool);
  var userData = {
    Username: "username",
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();

      //POTENTIAL: Region needs to be set if not already set previously elsewhere.
      AWS.config.region = process.env.REACT_APP_region;

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: userPool.id, // your identity pool id here
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
};

export { createPool, signUpUser, loginUser };
