import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";

function App() {
  return (
    <Container>
      <Row className="mt-5" />
      <Row className="mt-5">
        <Col
          xs={{ span: 4, order: 2 }}
          md={{ span: 3, order: 1 }}
          className="mt-5"
        >
          1 of 3
        </Col>
        <Col xs={{ span: 4, order: 1 }} md={{ span: 6, order: 2 }}>
          2 of 3
        </Col>
        <Col
          xs={{ span: 4, order: 3 }}
          md={{ span: 3, order: 3 }}
          className="mt-5"
        >
          3 of 3
        </Col>
      </Row>
    </Container>
  );
}

export default withAuthenticator(App, { includeGreetings: true });
