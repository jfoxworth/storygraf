/*

  This is a custom hook that is used to pull in data for
  a specific tag. Before it does this, it checks to see
  if that tag is already present in "memory". If it is,
  it uses that data instead of pulling that data.

  The hook takes in the id for the parent tag as well as
  the id for the tag in question and ID of the current user. 
  It passes back the data for the tag, a variable called "state". 
  This variable contains a status bit, an error bit, a data 
  object that holds the results, and an update function.


  This code is somewhat based on the article that is 
  located here:

  https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/

  and the repo here:

  https://github.com/ooade/use-fetch-hook/blob/master/src/hooks.js

  I've tested this and it works fine. The issue is that I just don't
  feel like it's needed.
*/

import { useEffect, useRef, useReducer } from "react";
import { getTagInfo, updateTag } from "../utils/api/tag";

export const useTag = (parentId, id) => {
  const cache = useRef({});

  const initialState = {
    status: "idle",
    error: null,
    tagData: [],
    updateTag,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", tagData: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!parentId || !id) return;

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      if (cache.current[parentId + "-" + id]) {
        const data = cache.current[parentId + "-" + id];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await getTagInfo(parentId, id);
          const data = response;
          cache.current[parentId + "-" + id] = data;
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
  }, [parentId, id]);

  return state;
};
