import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className={"navbar-color"} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">StoryGraf</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="#">What is storygraf</Nav.Link>
            <Nav.Link href="#">The public graf</Nav.Link>
            <Nav.Link href="#">Your graf</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
