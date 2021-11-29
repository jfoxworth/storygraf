import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTag from "./components/CreateTag";
import SubmitArticle from "./components/SubmitArticle";

Amplify.configure(aws_exports);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createTag" element={<CreateTag />} />
        <Route path="/submitArticle" element={<SubmitArticle />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
