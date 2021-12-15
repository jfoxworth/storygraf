import React from "react";
import { Navbar, Container, Col, Nav } from "react-bootstrap";
import "../../../main.css";

const MainHeader = () => (
  <Navbar className={"page-footer"} bg="light" expand="lg">
    <Container>
      <Col xs={"3"} className="mt-5 mb-3"></Col>
      <Col xs={"3"} className="mt-5 mb-3">
        <Nav className="me-auto">
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Col>
      <Col xs={"3"} className="mt-5 mb-3">
        <Nav className="me-auto">
          <Nav.Link href="/tags">Tags</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Nav.Link href="/createTag">Create a Tag</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Nav.Link href="/submitStory">Submit a Story</Nav.Link>
        </Nav>
      </Col>
      <Col xs={"3"}></Col>
    </Container>
  </Navbar>
);

export default MainHeader;
