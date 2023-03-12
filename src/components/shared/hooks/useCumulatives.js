/*

  This is a custom hook that is used to pull in cumulative items for a
  tag. Before it does this, it checks to see if that cumulative is 
  already present in "memory". If it is, it uses that data instead 
  of pulling from the database.

  The hook takes in the id for the parent tag. It passes back the 
  data for the cumulative, a variable called "state", and a few functions. 

  This code is somewhat based on the article that is 
  located here:

  https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

  and the repo here:

  https://github.com/ooade/use-fetch-hook/blob/master/src/hooks.js

*/

import { useEffect, useRef, useReducer } from "react";
import { getCumulatives } from "../utils/api/cumulative";

export const useCumulative = (parentId) => {
  const cache = useRef({});

  const initialState = {
    status: "idle",
    error: null,
    cumuData: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return {
          ...initialState,
          status: "fetched",
          cumuData: JSON.parse(action.payload).Items,
        };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!parentId) return;

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      if (cache.current[parentId]) {
        const data = cache.current[parentId];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await getCumulatives(parentId);
          const data = response;
          cache.current[parentId] = data;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [parentId]);

  return state;
};
