/*
 
     This page displays a "tag" in storygraf. This component fetches all 
     items with a primary key of "PTAG<PTAGID>". This will be the data 
     for the tag in question, all direct child tags, and all direct article
     children as well as any embedded tags, imported tags, or accumulated 
     items. It then calls children components to display the information.
     
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TagInfo from "./TagInfo";
import ArticleLine from "../../shared/ArticleLineEdit";
import TagChildrenTags from "../../shared/TagChildrenTags";
import { useUser } from "../../Contexts/UserContext";
import {
  getTagChildren,
  getTagInfo,
  updateTag,
} from "../../shared/utils/api/tag";
import {
  getCumulatives,
  updateCumulative,
} from "../../shared/utils/api/cumulative";
import { getChildArticles } from "../../shared/utils/api/item";
import {
  checkChildTagProperties,
  syncCumulativeValues,
} from "../../shared/utils/tags";
import EditArticleModal from "../../shared/EditArticleModal";
import DeleteItemModal from "../../shared/DeleteItemModal";

const TagPage = () => {
  const [showEditArticle, setShowEditArticle] = useState(false);
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [thisTag, setThisTag] = useState({});
  const [childTags, setChildTags] = useState([]);
  const [childArticles, setChildArticles] = useState([]);
  const [cumulatives, setCumulatives] = useState([]);
  const [ready, setReady] = useState(false);
  const params = useParams();
  const userData = useUser();

  // On page load, fetch the data
  useEffect(() => {
    const promise1 = getTagInfo(params.pTagId, params.tagId);
    const promise2 = getTagChildren(params.tagId);
    const promise3 = getChildArticles(params.tagId);
    const promise4 = getCumulatives(params.tagId);
    Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
      setThisTag(JSON.parse(values[0]));
      setChildTags(JSON.parse(values[1]).Items);
      setChildArticles(JSON.parse(values[2]).Items);
      setCumulatives(JSON.parse(values[3]).Items);
      checkChildTagProperties(
        JSON.parse(values[0]),
        JSON.parse(values[1]).Items,
        updateTag
      );
      setReady(true);
    });
  }, [params.pTagId, params.tagId]);

  // When the article data changes, check that data against the cumulative data,
  // and update the cumulative and the tag where necessary
  useEffect(() => {
    syncCumulativeValues(
      thisTag,
      childTags,
      childArticles,
      cumulatives,
      updateTag,
      updateCumulative
    );
  }, [childArticles, childTags, cumulatives, syncCumulativeValues]);

  const addChildItem = (newItem) => {
    setChildTags([...childTags, newItem]);
  };

  const handleShowEditArticle = (status, newArticle) => {
    setCurrentArticle(newArticle);
    setShowEditArticle(status);
  };

  const handleShowDeleteItem = (status, item) => {
    setCurrentArticle(item);
    setShowDeleteItem(status);
  };

  return (
    <>
      {showEditArticle && (
        <EditArticleModal
          show={showEditArticle}
          setshoweditarticle={handleShowEditArticle}
          onHide={() => handleShowEditArticle(false)}
          article={currentArticle}
          userdata={userData}
        />
      )}

      {showDeleteItem && (
        <DeleteItemModal
          show={showDeleteItem}
          setshowdeleteitem={handleShowDeleteItem}
          onHide={() => handleShowDeleteItem(false)}
          item={currentArticle}
        />
      )}

      {!ready && <Spinner animation="border" variant="primary" />}
      {ready && (
        <Container>
          <Row>{JSON.stringify(cumulatives)}</Row>
          <Row>---------------</Row>
          <Row>{JSON.stringify(thisTag.data.cumulatives)}</Row>
          <Row>
            <Col xs={{ span: 12 }} md={{ span: 10, offset: 1 }}>
              <TagInfo
                tag={thisTag}
                cumulatives={cumulatives}
                setCumulatives={setCumulatives}
                setThisTag={setThisTag}
                userData={userData || {}}
                addChildItem={addChildItem}
              />

              <Row className="accent-top">
                <Col className="mt-3">
                  {childTags.length > 0 && (
                    <TagChildrenTags childTags={childTags} />
                  )}
                </Col>
              </Row>
              <Row>
                <Col className="mt-3">
                  {childArticles
                    .sort((a, b) =>
                      a.itemDate < b.item_date
                        ? 1
                        : b.itemDate < a.itemDate
                        ? -1
                        : 0
                    )
                    .map((article, i) => (
                      <ArticleLine
                        article={article}
                        parentTag={thisTag}
                        key={`article${i}`}
                        handleShowEditArticle={handleShowEditArticle}
                        handleShowDeleteItem={handleShowDeleteItem}
                      />
                    ))}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default TagPage;
