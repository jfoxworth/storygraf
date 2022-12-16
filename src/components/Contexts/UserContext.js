import React, { useContext, useState } from "react";
import { createPool } from "../shared/utils/cognito";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const CognitoUserPool = createPool();
  const [userData, setUserData] = useState(
    CognitoUserPool.getCurrentUser() || null
  );

  function setUser(thisUser) {
    setUserData(thisUser);
  }

  return (
    <UserContext.Provider value={userData}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
