import React from "react";
import ArticleLine from "../ArticleLine";

const TagArticles = ({ tag, articles, showEdits = false }) => {
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
