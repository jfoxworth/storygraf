import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateSource from "./components/CreateSource";
import MainHeader from "./components/shared/MainHeader";
import MainFooter from "./components/shared/MainFooter";
import ListSources from "./components/ListSources";
import TagsPage from "./components/TagsPage";
import TagPage from "./components/TagPage";
import ProfilePage from "./components/Profile";
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
            <Route path="/createSource" element={<CreateSource />} />
            <Route path="/Sources" element={<ListSources />} />
            <Route path="/TagsPage" element={<TagsPage />} />
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
