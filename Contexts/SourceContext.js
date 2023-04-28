import React, { useContext, useState, useEffect } from "react";
import hardSources from "../public/assets/sources.json";

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
  const [sourceData, setSourceData] = useState(hardSources);

  useEffect(() => {
    fetch("http://localhost:3080/api/sources", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) =>
        setSourceData([...hardSources, ...JSON.parse(data).Items])
      );
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
