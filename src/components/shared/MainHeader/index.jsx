import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useUser } from "../../Contexts/UserContext";
import "../../../main.css";

const MainHeader = () => {
  const userData = useUser();

  return (
    <Navbar fixed="top" className={"navbar-color"} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">StoryGraf</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Tags">Tags</Nav.Link>
            <Nav.Link href="/Profile">{userData.name || "Profile"}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
