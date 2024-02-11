/*

    This page holds a user's profile, the tags that they follow,
    and their "top level" tags that they have created.

    The PTAGs for a user's top level tags are the phrase "USER#"
    followed by the user's ID.
    
*/

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/Contexts/UserContext";
import { SourceProvider } from "./components/Contexts/SourceContext";

import HeaderMain from "./components/shared/HeaderMain";
import HeaderLanding from "./components/shared/HeaderLanding";

import LandingPage from "./components/Pages/Landing";
import CreateSource from "./components/Pages/CreateSource";
import CreateTag from "./components/Pages/CreateTag";
import MainFooter from "./components/shared/MainFooter";
import ListSources from "./components/Pages/Sources";
import Tags from "./components/Pages/Tags";
import TagPage from "./components/Pages/Tag";
import ArticlePage from "./components/Pages/Article";
import ProfilePage from "./components/Pages/Profile";
import MyProfilePage from "./components/Pages/MyProfile";
import MyGraf from "./components/Pages/MyGraf";
import RegisterPage from "./components/Pages/Register";
import LoginPage from "./components/Pages/Login";
import GoogleFontLoader from "react-google-font-loader";

function App() {
  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Montserrat",
            weights: [500, "500i"],
          },
          {
            font: "PT Serif",
            weights: [400],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />{" "}
      <UserProvider>
        <SourceProvider>
          {window.location.pathname !== "/" && <HeaderMain />}
          {window.location.pathname === "/" && <HeaderLanding />}
          <BrowserRouter>
            <Routes>
              <Route path="" element={<LandingPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/createSource" element={<CreateSource />} />
              <Route path="/createTag" element={<CreateTag />} />
              <Route path="/Sources" element={<ListSources />} />
              <Route path="/Tags" element={<Tags />} />
              <Route path="/Tag/:pTagId/:tagId" element={<TagPage />} />
              <Route path="/Article/:articleId" element={<ArticlePage />} />
              <Route path="/MyProfile" element={<MyProfilePage />} />
              <Route path="/MyGraf" element={<MyGraf />} />
              <Route path="/Profile/:userId" element={<ProfilePage />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/Login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
          <MainFooter />
        </SourceProvider>
      </UserProvider>
    </>
  );
}

export default App;
