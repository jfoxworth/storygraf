import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const createPool = () => {
  const poolData = {
    UserPoolId: process.env.REACT_APP_UserPoolId,
    ClientId: process.env.REACT_APP_UserPoolClientId,
  };
  const poolDataTemp = {
    UserPoolId: "us-east-2_bInPwxVtq",
    ClientId: "688p0ue75spe2edfmq26f24kfm",
  };
  return new AmazonCognitoIdentity.CognitoUserPool(poolDataTemp);
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
    email,
    password,
    attributeList,
    null,
    function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      } else {
        return createDBUserData(username, email, result.userSub);
      }
    },
    null
  );
};

// Make call to add user and profile
const createDBUserData = (username, email, id) => {
  fetch("http://localhost:3080/api/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      cognitoId: id,
    }),
  }).then((response) => {
    return true;
  });
};

const getSession = async () =>
  await new Promise((resolve, reject) => {
    const userPool = createPool();
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject();
        } else {
          resolve(session);
        }
      });
    } else {
      reject();
    }
  });

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
  //  let result = await asyncAuthenticateUser(cognitoUser, authenticationDetails);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      //var accessToken = result.getAccessToken().getJwtToken();
      window.location.href = "/MyProfile";

      /*
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
*/
    },

    onFailure: function (err) {
      alert(err.message || JSON.stringify(err));
    },
  });
};

const logoutUser = async () => {
  var userPool = createPool();
  const user = userPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};

export { createPool, signUpUser, loginUser, logoutUser, getSession };
