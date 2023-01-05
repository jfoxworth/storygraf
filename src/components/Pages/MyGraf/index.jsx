/*
    This is the page for a person's graf. It pulls in the tags
    that a person follows and then pulls in those tags and displays
    the related articles.
*/

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useUser } from "../../Contexts/UserContext";
import { getTagsUserFollows } from "../../shared/utils/api/follower";
import ArticleLineThin from "../../shared/ArticleLineThin";
import TagStack from "../../shared/TagStack";
const MyGraf = () => {
  const userData = useUser();
  const [tagsFollowing, setTagsFollowing] = useState([]);

  useEffect(() => {
    if (userData?.profileData?.id) {
      getTagsUserFollows(userData.profileData.id).then((data) => {
        setTagsFollowing(JSON.parse(data));
      });
    }
  }, [userData?.profileData?.id]);

  return (
    <Container>
      <Row className={"mt-5"}>
        <Col className={"text-center"}>
          <h1>Graf of Tags that I follow</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 5 }}>
          {tagsFollowing
            .filter((tag, i) => i % 2 === 0)
            .map((tag) => (
              <div className={"mb-5"}>
                <Row className={"accent-bottom pb-3 mb-3"}>
                  <Col>
                    <TagStack
                      tagStack={tag.data?.tagTree.concat(tag)}
                      variant={"inline"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {tag.data.articlesList.map((article) => (
                      <ArticleLineThin article={article} />
                    ))}
                  </Col>
                </Row>
              </div>
            ))}
        </Col>
        <Col xs={{ span: 5, offset: 2 }}>
          {tagsFollowing
            .filter((tag, i) => i % 2 === 1)
            .map((tag) => (
              <div className={"mb-5"}>
                <Row className={"accent-bottom pb-3 mb-3"}>
                  <Col>
                    <TagStack
                      tagStack={tag.data?.tagTree.concat(tag)}
                      variant={"inline"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {tag.data.articlesList.map((article) => (
                      <ArticleLineThin article={article} />
                    ))}
                  </Col>
                </Row>
              </div>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MyGraf;
