import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const MainHeader = () => (
  <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">StoryGraf</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/tags">Tags</Nav.Link>
          <Nav.Link href="/mystories">My Stories</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default MainHeader;
