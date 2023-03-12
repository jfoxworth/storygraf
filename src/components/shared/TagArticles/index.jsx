import React, { useState, useEffect } from "react";
import ArticleLine from "../ArticleLineEdit";

const TagArticles = ({ tag, articles, showEdits = false }) => {
  const [orderedArticles, setOrderedArticles] = useState(articles);

  const orderArticles = () => {
    setOrderedArticles(
      orderedArticles.sort((a, b) => {
        return new Date(b.itemDate) - new Date(a.itemDate);
      })
    );
  };

  useEffect(() => {
    orderArticles();
  }, [articles]);

  return (
    <div>
      {orderedArticles.map((article, i) => (
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
