import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
