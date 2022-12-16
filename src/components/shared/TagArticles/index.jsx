import React, { useState, useEffect } from "react";
import { listArticles } from "../../../graphql/queries";
import ArticleLine from "../ArticleLine";
import { UserContext } from "../../../App";

const TagArticles = ({
  tag,
  articles,
  showEdits = false,
  setNumArticles = () => {},
  cumulatives = [],
  setCumulatives = () => {},
}) => {
  return (
    <div className={`ml-small pt-3 `}>
      {articles.map((article, i) => (
        <ArticleLine
          article={article}
          key={`${i}${article.id}`}
          showEdits={showEdits}
          parentTag={tag}
        />
      ))}
    </div>
  );
};

export default TagArticles;
