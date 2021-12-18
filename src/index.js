import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
//import Amplify from "aws-amplify";
//import aws_exports from "./aws-exports";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
Auth.configure(awsconfig);
//Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
