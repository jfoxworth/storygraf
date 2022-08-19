import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUserUpdate() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({ name: "TheWolf" });

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
