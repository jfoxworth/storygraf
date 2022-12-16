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
import Tag from "../../shared/Tag";
import TagInfo from "./TagInfo";
import TagChildren from "../../shared/TagChildren";
import TagArticles from "../../shared/TagArticles";

const TagPage = () => {
  const [thisTag, setThisTag] = useState({});
  const [childData, setChildData] = useState([]);
  const params = useParams();
  const userData = {};

  // Get all tags, articles, and other items for this tag
  const getTagChildren = (tagId) => {
    fetch("http://localhost:3080/api/tag_children/PTAG/" + tagId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => setChildData(JSON.parse(data).Items));
  };

  // Get this tag info (different parent from above)
  const getTagInfo = (pTagId, tagId) => {
    fetch("http://localhost:3080/api/tag/" + pTagId + "/" + tagId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => setThisTag(JSON.parse(data)));
  };

  // Check how many child articles and tags this tag has
  const checkChildNumbers = () => {
    setThisTag({
      ...thisTag,
      data: {
        ...thisTag.data,
        childTags: childData.filter((tag) => tag.type === "TAG").length,
        childArticles: childData.filter((tag) => tag.type === "ARTICLE").length,
      },
    });
  };

  useEffect(() => {
    getTagInfo(params.pTagId, params.tagId);
    getTagChildren(params.tagId);
  }, [params.tagId]);

  useEffect(() => {
    checkChildNumbers(thisTag);
  }, [childData.length]);

  return (
    <>
      {!!thisTag.id && <Spinner animation="border" variant="primary" />}
      {thisTag.id && (
        <Container>
          <Row className={"mt-12"}>
            <Col xs={{ span: 12 }} md={{ span: 10, offset: 1 }}>
              <Row className="mt-5 accent-bottom">
                <Col xs={{ span: 8 }} md={{ span: 8 }}>
                  <Tag
                    tag={thisTag}
                    handleCreateTagClick={() => {}}
                    handleCreateArticleClick={() => {}}
                    showAdds={false}
                  />
                </Col>
                <Col xs={{ span: 4 }} md={{ span: 4 }}>
                  <div className={"text-right w-full"}>
                    {userData?.attributes?.email}
                  </div>
                </Col>
              </Row>

              {/* Display info for the tag */}
              <TagInfo tag={thisTag} userData={userData || {}} />

              <Row className="mt-5">
                <Col>
                  <h2 className="accent-bottom mb-3 pb-3"></h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  {thisTag && (
                    <>
                      {/* Display child tags */}
                      <TagChildren
                        childTags={childData.filter(
                          (tag) => tag.id !== params.tagId && tag.type === "TAG"
                        )}
                      />
                      {/* Display child articles */}
                      <TagArticles
                        articles={childData.filter(
                          (tag) =>
                            tag.id !== params.tagId && tag.type === "ARTICLE"
                        )}
                        showEdits={true}
                      />
                    </>
                  )}
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
