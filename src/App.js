import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/Contexts/UserContext";
import { SourceProvider } from "./components/Contexts/SourceContext";

import MainHeader from "./components/shared/MainHeader";
import Header from "./components/Pages/Landing/Header";

import LandingPage from "./components/Pages/Landing";
import CreateSource from "./components/Pages/CreateSource";
import CreateTag from "./components/Pages/CreateTag";
import MainFooter from "./components/shared/MainFooter";
import ListSources from "./components/Pages/Sources";
import Tags from "./components/Pages/Tags";
import TagPage from "./components/Pages/Tag";
import ArticlePage from "./components/Pages/Article";
import ProfilePage from "./components/Pages/Profile";
import CreateMainPage from "./components/Pages/CreateMain";
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
          {window.location.pathname !== "/" && <MainHeader />}
          {window.location.pathname === "/" && <Header />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/CreateGraf" element={<CreateMainPage />} />
              <Route path="/createSource" element={<CreateSource />} />
              <Route path="/createTag" element={<CreateTag />} />
              <Route path="/Sources" element={<ListSources />} />
              <Route path="/Tags" element={<Tags />} />
              <Route path="/Tag/:pTagId/:tagId" element={<TagPage />} />
              <Route path="/Article/:articleId" element={<ArticlePage />} />
              <Route path="/Profile/:userId" element={<TagPage />} />
              <Route path="/Profile" element={<ProfilePage />} />
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
