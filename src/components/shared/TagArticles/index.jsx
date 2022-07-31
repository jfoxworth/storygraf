import React, { useState, useEffect } from "react";
import { listArticles } from "../../../graphql/queries";
import ArticleLine from "../ArticleLine";
import { UserContext } from "../../../App";

const TagArticles = ({
  tag,
  showEdits = false,
  setNumArticles = () => {},
  cumulatives = [],
  setCumulatives = () => {},
}) => {
  const [articleData, setArticleData] = useState([]);

  const getTagArticles = async (id) => {
    /*
    await API.graphql({
      query: listArticles,
      variables: { filter: { tagId: { eq: id } } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      let articleList = [];
      data.data.listArticles.items.forEach((art) => {
        articleList.push({ ...art, data: JSON.parse(art.data) });
      });
      articleList.sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
      );
      setArticleData(articleList);
      setNumArticles(data.data.listArticles.items.length);
      let temp = [];
      articleList.forEach((art) => {
        art.data?.cumulatives?.forEach((artCumItem) => {
          cumulatives.forEach((cumItem) => {
            if (cumItem === artCumItem.text) {
              if (cumulatives[cumItem]) {
                temp[cumItem] = temp[cumItem] + artCumItem.value;
              } else {
                temp[cumItem] = artCumItem.value;
              }
            }
          });
        });
      });
      setCumulatives(temp);
    });
    */
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
          parentTag={tag}
        />
      ))}
    </div>
  );
};

export default TagArticles;
