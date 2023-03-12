/*
    This component calls the various components to display 
    the children for a tag.
*/

import React from "react";
import TagChildrenTags from "../../../shared/TagChildrenTags";
import ArticleLine from "../../../shared/ArticleLine";
import ArticleLineEdit from "../../../shared/ArticleLineEdit";
import { useUser } from "../../../Contexts/UserContext";

const TagChildren = ({
  tag,
  childData,
  handleShowEditArticle,
  handleShowDeleteItem,
}) => {
  const userData = useUser();

  return (
    <>
      {/* Display child tags */}
      <TagChildrenTags
        childTags={childData.filter((tag) => tag.type === "TAG")}
      />
      {/* Display child articles */}
      {userData.profileData.id === tag.creatorId &&
        childData
          .filter((tag) => tag.type === "ARTICLE")
          .sort((a, b) => {
            return new Date(b.itemDate) - new Date(a.itemDate);
          })
          .map((article, i) => (
            <ArticleLineEdit
              article={article}
              parentTag={tag}
              key={`article${i}`}
              handleShowEditArticle={handleShowEditArticle}
              handleShowDeleteItem={handleShowDeleteItem}
            />
          ))}
      {userData.profileData.id !== tag.creatorId &&
        childData
          .filter((tag) => tag.type === "ARTICLE")
          .sort((a, b) => {
            return new Date(b.itemDate) - new Date(a.itemDate);
          })
          .map((article, i) => (
            <>
              <ArticleLine
                article={article}
                parentTag={tag}
                key={`article${i}`}
                handleShowEditArticle={handleShowEditArticle}
              />
            </>
          ))}
    </>
  );
};
