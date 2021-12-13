import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import Amplify from "aws-amplify";
//import aws_exports from "./aws-exports";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateSource from "./components/CreateSource";
import MainHeader from "./components/shared/MainHeader";
import MainFooter from "./components/shared/MainFooter";
import ListSources from "./components/ListSources";

import TagsPage from "./components/TagsPage";
import TagPage from "./components/TagPage";
import ProfilePage from "./components/Profile";

import Amplify, { Auth } from "aws-amplify";
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
        <Route path="/createSource" element={<CreateSource />} />
        <Route path="/listSources" element={<ListSources />} />
        <Route path="/TagsPage" element={<TagsPage />} />
        <Route path="/Tag/:tagId" element={<TagPage />} />
        <Route path="/Profile/:userId" element={<TagPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
    <MainFooter />
  </React.StrictMode>,
  document.getElementById("root")
);
