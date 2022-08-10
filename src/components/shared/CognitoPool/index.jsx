import { CognitoUserPool } from "amazon-cognito-identity-js";
const poolData = {
  UserPoolId: process.env.REACT_APP_UserPoolId,
  ClientId: process.env.REACT_APP_UserPoolClientId,
};
export default new CognitoUserPool(poolData);
