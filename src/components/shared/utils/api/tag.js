/*

    This is a utility file that does all the fetching of data
    for the tags as well as posting of updates.

*/

// Get the children for a tag. It takes the ID of the tag to be
// fetched
const getTagChildren = (tagId) => {
  return fetch("http://localhost:3080/api/tag_children/PTAG/" + tagId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());
};

// Get the info for a tag. It takes the ID of the tag to be
// fetched
const getTagInfo = (pTagId, tagId) => {
  return fetch("http://localhost:3080/api/tag/" + pTagId + "/" + tagId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());
};

// Create a tag. It takes in the tag to be created and a function
// that will add the tag to the array of child data for the parent tag
const createTag = (tag) => {
  return fetch("http://localhost:3080/api/tag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Item: { ...tag },
    }),
  }).then((response) => response.text());
};

// Create a tag. It takes in the tag to be created and a function
// that will add the tag to the array of child data for the parent tag
const updateTag = (tag) => {
  return fetch("http://localhost:3080/api/tag", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Item: tag }),
  }).then((response) => response.text());
};

export { getTagChildren, getTagInfo, createTag, updateTag };
