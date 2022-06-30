import React, { useState, useEffect } from "react";
import { listArticles } from "../../../graphql/queries";
import { API } from "aws-amplify";
import ArticleLine from "../ArticleLine";

const TagArticles = ({
  tag,
  showDelete = false,
  setNumArticles = () => {},
}) => {
  const [articleData, setArticleData] = useState([]);

  const getTagArticles = async (id) => {
    await API.graphql({
      query: listArticles,
      variables: { filter: { tagId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      setArticleData(data.data.listArticles.items);
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
          showDelete={showDelete | false}
        />
      ))}
    </div>
  );
};

export default TagArticles;
