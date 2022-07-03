import React, { useState, useEffect } from "react";
import { listArticles } from "../../../graphql/queries";
import { API } from "aws-amplify";
import ArticleLine from "../ArticleLine";

const TagArticles = ({ tag, showEdits = false, setNumArticles = () => {} }) => {
  const [articleData, setArticleData] = useState([]);

  const getTagArticles = async (id) => {
    await API.graphql({
      query: listArticles,
      variables: { filter: { tagId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      console.log(data.data.listArticles.items);
      let articleList = [];
      data.data.listArticles.items.forEach((art) => {
        articleList.push({ ...art, data: JSON.parse(art.data) });
      });
      setArticleData(articleList);
      setNumArticles(data.data.listArticles.items.length);
    });
  };

  useEffect(() => {
    getTagArticles(tag.id);
  }, [tag.id]);

  return (
    <div className={`ml-small pt-3 `}>
      {articleData.map((article, i) => (
        <ArticleLine
          article={article}
          key={`${i}${article.id}`}
          showEdits={showEdits}
        />
      ))}
    </div>
  );
};

export default TagArticles;
