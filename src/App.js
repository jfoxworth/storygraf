import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateSource from "./components/Pages/CreateSource";
import MainHeader from "./components/shared/MainHeader";
import MainFooter from "./components/shared/MainFooter";
import ListSources from "./components/Pages/Sources";
import Tags from "./components/Pages/Tags";
import TagPage from "./components/Pages/Tag";
import ProfilePage from "./components/Pages/Profile";
import MainPage from "./components/Pages/MainPage";
import CreateMainPage from "./components/Pages/CreateMain";
Auth.configure(awsconfig);

function App() {
  const [userData, setUserData] = useState({});
  const UserContext = React.createContext(userData);

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={userData}>
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
            <Route path="/Profile/:userId" element={<TagPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
        <MainFooter />
      </UserContext.Provider>
    </>
  );
}

//export default withAuthenticator(App, { includeGreetings: true });
export default App;
