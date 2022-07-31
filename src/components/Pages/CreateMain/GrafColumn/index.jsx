import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { updateStorygraf } from "../../../../graphql/mutations";

const GrafColumn = ({ grafdata }) => {
  /*
  const changeColumnProps = async (event) => {
    event.preventDefault();
    const input = {};
    await API.graphql({
      query: updateStorygraf,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };
  */

  return (
    <Container>
      {grafdata &&
        grafdata.map((grafItem, i) => (
          <Row key={`${grafItem.column}${i}`}>
            <Col>{grafItem.tag.name}</Col>
          </Row>
        ))}
    </Container>
  );
};

export default GrafColumn;
