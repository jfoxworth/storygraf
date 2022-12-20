/*
    This context provides checks to see if a user is logged in
    If so, the storygraf back end is hit to grab the user profile.
    The session data as well as the profile data are passed
    as part of the context.

*/

import React, { useContext, useState, useEffect } from "react";
import { createPool, getSession } from "../shared/utils/cognito";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const CognitoUserPool = createPool();
  const [cognitoData, setCognitoData] = useState(
    CognitoUserPool.getCurrentUser() || null
  );
  const [profileData, setProfileData] = useState({});

  const getProfileData = (email) => {
    fetch("http://localhost:3080/api/profile/" + email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => setProfileData(JSON.parse(data).Items[0]));
  };

  useEffect(() => {
    getSession().then((session) => {
      setCognitoData(session);
      getProfileData(session?.idToken?.payload?.email);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        cognitoData: cognitoData,
        profileData: profileData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
