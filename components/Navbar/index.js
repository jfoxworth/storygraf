/*
    This is the header that is shown on the home page
*/
import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import logo from "../../public/images/logo.png";
import { useUser } from "../../Contexts/UserContext";

const MainHeader = () => {
  const userData = useUser();

  return (
    <Navbar
      fixed="top"
      bg="dark"
      variant="dark"
      expand="lg"
      className="gap-3"
      style={{
        padding: "1rem 0",
        borderBottom: "10px solid #a01d26 !important",
      }}
    >
      <Container>
        <Navbar.Brand href="/"> StoryGraf</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1 justify-content-end">
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
              <div>
                <Link
                  style={{
                    color: "#AAAAAA",
                    marginRight: "1em",
                    textDecoration: "none",
                  }}
                  href="/Tags"
                >
                  Tags
                </Link>
                <Link
                  style={{
                    color: "#AAAAAA",
                    marginRight: "1em",
                    textDecoration: "none",
                  }}
                  href="/Login"
                >
                  Login
                </Link>
                <Link
                  style={{
                    color: "#AAAAAA",
                    marginRight: "1em",
                    textDecoration: "none",
                  }}
                  href="/Register"
                >
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
