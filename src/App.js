import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/Contexts/UserContext";
import CreateSource from "./components/Pages/CreateSource";
import MainHeader from "./components/shared/MainHeader";
import MainFooter from "./components/shared/MainFooter";
import ListSources from "./components/Pages/Sources";
import Tags from "./components/Pages/Tags";
import TagPage from "./components/Pages/Tag";
import ArticlePage from "./components/Pages/Article";
import ProfilePage from "./components/Pages/Profile";
import MainPage from "./components/Pages/MainPage";
import CreateMainPage from "./components/Pages/CreateMain";
import RegisterPage from "./components/Pages/Register";
import LoginPage from "./components/Pages/Login";
import ConfirmPage from "./components/Pages/Confirm";

function App() {
  return (
    <>
      <UserProvider>
        <MainHeader />
        <Row className="mt-5"></Row>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/CreateGraf" element={<CreateMainPage />} />
            <Route path="/createSource" element={<CreateSource />} />
            <Route path="/Sources" element={<ListSources />} />
            <Route path="/Tags" element={<Tags />} />
            <Route path="/Tag/:tagId" element={<TagPage />} />
            <Route path="/Article/:articleId" element={<ArticlePage />} />
            <Route path="/Profile/:userId" element={<TagPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Confirm/:username" element={<ConfirmPage />} />
          </Routes>
        </BrowserRouter>
        <MainFooter />
      </UserProvider>
    </>
  );
}

export default App;
