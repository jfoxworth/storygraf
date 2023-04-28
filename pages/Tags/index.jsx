/*
    This is a one off page that holds the top level official
    tags for storygraf. These should be the highest level tags
    such as "sports" or "US Politics". Since this page will
    be viewed often, I may plan to hard code this in a while.
*/

// React items
import React from "react";

// Bootstrap items
import { Container, Row, Col } from "react-bootstrap";

// My components
import TagList from "../../components/TagList";

// My api functions
import { getTagChildren } from "../../utils/api/tag";

const Tags = ({ childData }) => {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={{ span: 12 }} md={{ span: 8, offset: 2 }}>
          <Row>
            <Col>
              <h1 className="text-center mb-3 mt-5 pb-3">
                Offical Storygraf Tags
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="bodyFont greyText">
              <p>
                The tags below are the top level tags for storygraf. Within
                these tags, subjects are broken down into smaller and smaller
                tags and then into stories. You can follow a tag, embed it into
                your own grafs, or import its contents into one of your grafs.
              </p>
            </Col>
          </Row>
          <Row className={"mt-5"}>
            <TagList tags={childData} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

// Pull the tags on the server
// This could/should be hard coded as I expect this to be the most loaded page
// as well as one that does not change
export async function getServerSideProps() {
  const response = await getTagChildren(0);
  const childData = await response.json();
  return {
    props: {
      childData: childData.Items,
    },
  };
}

export default Tags;
