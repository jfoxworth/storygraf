import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import CreateTagModal from "../shared/CreateTagModal";
import { useParams } from "react-router-dom";
import { getTag } from "../../graphql/queries";
import { API } from "aws-amplify";
import TagCard from "./TagCard";
import UserCard from "./UserCard";

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
      console.log(tagData);
      tagData.data = JSON.parse(tagData.data);
      setThisTag(tagData);
    });
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
    getThisTag(params.tagId);
  }, [params.tagId]);

  return (
    <>
      <CreateTagModal
        show={showCreateTag}
        onHide={() => setShowCreateTag(false)}
        parentTag={"0"}
        userData={userData}
      />

      <Container>
        <Row className={"mt-5"}></Row>
        <Row className={"mt-5 text-center"}>
          <h2>Summary of Tag Data</h2>
        </Row>
        <Row className={"mt-3"}>
          <Col
            xs={{ span: 12, order: 1 }}
            sm={{ span: 4, order: 1, offset: 2 }}
          >
            {thisTag.id && <TagCard tag={thisTag} />}
          </Col>
          <Col
            xs={{ span: 12, order: 2 }}
            sm={{ span: 4, order: 2, offset: 0 }}
          >
            <UserCard userData={userData} />
          </Col>
        </Row>

        <Row></Row>
      </Container>
    </>
  );
};

export default TagPage;
