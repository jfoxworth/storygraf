import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../../../main.css";

const MainHeader = () => (
  <Navbar
    fixed="top"
    className={"navbar-color"}
    bg="dark"
    variant="dark"
    expand="lg"
  >
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
