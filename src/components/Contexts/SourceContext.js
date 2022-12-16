import React, { useContext, useState, useEffect } from "react";

const SourceContext = React.createContext();
export default SourceContext;
const SourceUpdateContext = React.createContext();

export function useSource() {
  return useContext(SourceContext);
}

export function useSourceUpdate() {
  return useContext(SourceUpdateContext);
}

export function SourceProvider({ children }) {
  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    console.log("Fetching the sources");

    fetch("http://localhost:3080/api/sources", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => setSourceData(JSON.parse(data).Items));
  }, []);

  function setSources(sources) {
    setSourceData(sources);
  }

  return (
    <SourceContext.Provider value={sourceData}>
      <SourceUpdateContext.Provider value={setSources}>
        {children}
      </SourceUpdateContext.Provider>
    </SourceContext.Provider>
  );
}
