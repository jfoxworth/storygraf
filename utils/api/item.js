/*

    This is a utility file that does all the fetching of data
    for the items as well as posting of updates.

    An "item" is anything under a tag that is not a child tag.
    This can be an article, social media post, video, text entry, 
    etc

*/

// Get the article children for a tag.
const getChildArticles = (tagId) => {
  return fetch("http://localhost:3080/api/article_children/PTAG/" + tagId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createItem = (item) => {
  return fetch("http://localhost:3080/api/item", {
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

const deleteItem = (item) => {
  return fetch("http://localhost:3080/api/item", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentTagId: item.parent_tag_id,
      itemId: item.id,
      type: item.type,
    }),
  }).then((response) => response.text());
};

export { getChildArticles, createItem, updateArticle, deleteItem };
