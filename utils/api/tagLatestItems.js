/*

    This is a utility file that does all the fetching for TagArticles.
    These are the things that hold the latest articles for a tag.
*/

// Get the latest articles list for a tag. It takes the ID of the tag
const getTagLatestItems = (tagId) => {
  return fetch("http://localhost:3080/api/tag_latest_items/" + tagId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());
};

const createTagLatestItems = (data) => {
  return fetch("http://localhost:3080/api/tag_latest_items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Item: { data: data },
    }),
  }).then((response) => response.text());
};

// Update a tag article
const updateTagLatestItems = (tagLatestItem) => {
  return fetch("http://localhost:3080/api/tag_latest_items", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Item: tagLatestItem }),
  }).then((response) => response.text());
};

// Delete a tag Article
const deleteTagLatestItems = (tagArticleId, userId) => {
  return fetch("http://localhost:3080/api/tag_latest_items/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tagArticleId,
      userId,
    }),
  }).then((response) => response.text());
};

export {
  getTagLatestItems,
  createTagLatestItems,
  updateTagLatestItems,
  deleteTagLatestItems,
};
