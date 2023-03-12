/*

    This is a utility file that does all the fetching of data
    for the cumulative items for a tag.

*/

// Get the cumulatives for a tag.
const getCumulatives = (tagId) => {
  return fetch("http://localhost:3080/api/cumulatives/PTAG/" + tagId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());
};

const createCumulative = (item) => {
  return fetch("http://localhost:3080/api/cumulative", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Item: { ...item },
    }),
  }).then((response) => response.text());
};

const updateCumulative = (cumulativeItem) => {
  console.log("Updating cumulative with ...");
  console.log(cumulativeItem);
  return fetch("http://localhost:3080/api/cumulative", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Item: cumulativeItem }),
  }).then((response) => response.text());
};

const deleteCumulative = (parentTagId, cumulativeId) => {
  return fetch("http://localhost:3080/api/cumulative", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentTagId,
      cumulativeId,
    }),
  }).then((response) => response.text());
};

export { getCumulatives, createCumulative, updateCumulative, deleteCumulative };
