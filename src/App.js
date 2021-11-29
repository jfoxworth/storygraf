import { Container, Row, Col } from "react-bootstrap";
import Logohead from "./components/shared/logoHead/";
import "./App.css";

function App() {
  return (
    <Container>
      <Row className="mt-5">
        <Col
          xs={{ span: 4, order: 2 }}
          md={{ span: 3, order: 1 }}
          className="mt-5"
        >
          1 of 3
        </Col>
        <Col xs={{ span: 4, order: 1 }} md={{ span: 6, order: 2 }}>
          <Logohead />2 of 3
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

export default App;
