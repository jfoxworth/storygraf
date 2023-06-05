/*


*/

const createUserTagFollower = (tagId, parentTagId, userId) => {
  return fetch("http://localhost:3080/api/tag_user_follower/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tagId,
      parentTagId,
      userId,
    }),
  }).then((response) => response.text());
};

// Pull one tag that a user is following. This is used to check
// if the user is following this tag
const getUserTagFollower = (parentTagId, tagId, userId) => {
  return fetch(
    "http://localhost:3080/api/tag_user_follower/" +
      parentTagId +
      "/" +
      tagId +
      "/" +
      userId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.text());
};

// Pull all tags that a user follows
const getTagsUserFollows = (userId) => {
  return fetch("http://localhost:3080/api/tags_user_following/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());
};

const deleteUserTagFollower = (tagId, parentTagId, userId) => {
  return fetch("http://localhost:3080/api/tag_user_follower/", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tagId,
      parentTagId,
      userId,
    }),
  }).then((response) => response.text());
};

export {
  createUserTagFollower,
  getUserTagFollower,
  getTagsUserFollows,
  deleteUserTagFollower,
};
