/*

    This is a utility file that does all the fetching of data
    for the articles as well as posting of updates.

*/

const createItem = (item) => {
  return fetch("http://localhost:3080/api/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Item: { ...item },
    }),
  }).then((response) => response.text());
};

const updateArticle = (tag) => {
  return fetch("http://localhost:3080/api/tag", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Item: tag }),
  }).then((response) => response.text());
};

export { createItem, updateArticle };
