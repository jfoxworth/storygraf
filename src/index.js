import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import Amplify from "aws-amplify";
//import aws_exports from "./aws-exports";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTag from "./components/CreateNewTag";
import SubmitArticle from "./components/SubmitArticle";
import MainHeader from "./components/shared/MainHeader";
import MainFooter from "./components/shared/MainFooter";

import Amplify from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

//Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <MainHeader />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createTag" element={<CreateTag />} />
        <Route path="/submitArticle" element={<SubmitArticle />} />
      </Routes>
    </BrowserRouter>
    <MainFooter />
  </React.StrictMode>,
  document.getElementById("root")
);
