import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
  const getPageGraf = async () => {
    /*
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
*/
  };

  useEffect(() => {
    getPageGraf();
  }, []);

  return (
    <Container>
      <Row className={"mt-5"}>
        <Col
          xs={{ span: 10, offset: 1, order: 2 }}
          md={{ span: 3, offset: 1, order: 1 }}
        >
          <p>Left Column</p>
        </Col>

        <Col
          xs={{ span: 10, offset: 0, order: 1 }}
          md={{ span: 3, offset: 0, order: 2 }}
        >
          <p>Middle Column</p>
        </Col>

        <Col
          xs={{ span: 10, offset: 0, order: 3 }}
          md={{ span: 3, offset: 0, order: 3 }}
        >
          <p>Right Column</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
