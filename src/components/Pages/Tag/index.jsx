import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import CreateTagModal from "../../shared/CreateTagModal";
import { useParams } from "react-router-dom";
import { getTag } from "../../../graphql/queries";
import { API } from "aws-amplify";
import TagCard from "./TagCard";
import UserCard from "./UserCard";
import TagWaterfall from "../../shared/TagWaterFall";

const TagPage = (props) => {
  let [userData, setUserData] = useState({});
  let [showCreateTag, setShowCreateTag] = useState(false);
  let [thisTag, setThisTag] = useState({});
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

  return (
    <>
      {thisTag.id && (
        <CreateTagModal
          show={showCreateTag}
          onHide={() => setShowCreateTag(false)}
          parenttag={thisTag}
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
                <Container>
                  <div className="mt-3 center-me">
                    <Button
                      variant="success"
                      onClick={() => setShowCreateTag(true)}
                    >
                      Create Child Tag
                    </Button>{" "}
                  </div>
                </Container>
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
                    handleCreateTagClick={() => {}}
                    handleCreateArticleClick={() => {}}
                    showAdds={false}
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
