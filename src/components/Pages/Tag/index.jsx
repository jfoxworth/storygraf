import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import CreateTagModal from "../../shared/CreateTagModal";
import CreateArticleModal from "../../shared/CreateArticleModal";
import { useParams } from "react-router-dom";
import { getTag } from "../../../graphql/queries";
import { API } from "aws-amplify";
import TagCard from "./TagCard";
import UserCard from "./UserCard";
import TagWaterfall from "../../shared/TagWaterFall";

const TagPage = (props) => {
  let [userData, setUserData] = useState({});
  let [showCreateTag, setShowCreateTag] = useState(false);
  let [showCreateArticle, setShowCreateArticle] = useState(false);
  let [thisTag, setThisTag] = useState({});
  let [parentTag, setParentTag] = useState({ id: 0 });
  const params = useParams();

  const getThisTag = async (id) => {
    await API.graphql({
      query: getTag,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      let tagData = data.data.getTag;
      console.log("The tag data in the tag page is");
      console.log(tagData);
      tagData.data = JSON.parse(tagData.data);
      setThisTag(tagData);
    });
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
    console.log("The tag id is ...");
    console.log(params.tagId);
    getThisTag(params.tagId);
  }, [params.tagId]);

  const handleCreateTagClick = (parentTag) => {
    setParentTag(parentTag);
    setShowCreateTag(true);
  };

  const handleCreateArticleClick = (parentTag) => {
    setParentTag(parentTag);
    setShowCreateArticle(true);
  };

  return (
    <>
      {thisTag.id && (
        <CreateTagModal
          show={showCreateTag}
          onHide={() => setShowCreateTag(false)}
          parenttag={parentTag}
          userdata={userData}
        />
      )}

      {thisTag.id && (
        <CreateArticleModal
          show={showCreateArticle}
          setshowcreatearticle={setShowCreateArticle}
          onHide={() => setShowCreateTag(false)}
          parenttag={parentTag}
          userdata={userData}
        />
      )}

      <Container>
        <Row className={"mt-5"}></Row>
        <Row>
          <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
            <Row className="mt-5">
              <Col>
                <h2 className="accent-bottom mb-3 pb-3">Summary of Tag Data</h2>
              </Col>
            </Row>
            <Row className={"mt-3"}>
              <Col xs={{ order: 1 }} sm={{ order: 1 }}>
                {thisTag.id && <TagCard tag={thisTag} />}
              </Col>
              <Col xs={{ order: 2 }} sm={{ order: 2 }}>
                <UserCard userData={userData} />
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <h2 className="accent-bottom mb-3 pb-3">Tag Children</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                {thisTag && (
                  <TagWaterfall
                    showArticles={true}
                    tag={thisTag}
                    handleCreateTagClick={handleCreateTagClick}
                    handleCreateArticleClick={handleCreateArticleClick}
                    showAdds={true}
                    showDelete={true}
                    key={`main${thisTag.id}`}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TagPage;
