/*
    This is the header that is shown on the home page
*/
import React from "react";
import { Navbar, Container, Nav, Row, NavDropdown } from "react-bootstrap";
import { useUser } from "../../Contexts/UserContext";
import styled from "styled-components";
import logo from "../../../assets/images/logo.png";

const MainHeader = () => {
  const userData = useUser();
  console.log("In the header");
  console.log(userData);

  return (
    <StyledNav>
      <Navbar
        fixed="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className="gap-3 px-3"
        style={{ padding: "1rem 1rem" }}
      >
        <Container>
          <Navbar.Brand href="/">
            {" "}
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top mx-3"
            />{" "}
            StoryGraf
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-grow-1 justify-content-end">
              <Nav.Link href="/Tags">Tags</Nav.Link>
              {userData?.profileData?.data?.username && (
                <NavDropdown title={userData?.profileData?.data?.username}>
                  <NavDropdown.Item href="/MyProfile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/MyGraf">My Graf</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                </NavDropdown>
              )}
              {!userData?.profileData?.data?.username && (
                <>
                  <Nav.Link href="/Tags">Tags</Nav.Link>
                  <Nav.Link href="/Login">Login</Nav.Link>
                  <Nav.Link href="/Register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row style={{ height: "72px" }}></Row>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  border-bottom: 10px solid #a01d26 !important;
  border-bottom: 10px solid #3a5199 !important;
`;

export default MainHeader;
