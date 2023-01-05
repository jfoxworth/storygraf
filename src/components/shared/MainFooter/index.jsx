import React from "react";
import { Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import styled from "styled-components";

const MainFooter = () => (
  <StyledFooter>
    <Navbar expand="lg" bg="dark" variant={"dark"}>
      <Container>
        <Row>
          <Col xs={{ span: 3, offset: 2 }} className="mt-3 mb-3">
            <StyledHeader>About Us</StyledHeader>
            <StyledText>
              StoryGraf is designed to provide a cohesive, credible sequence of
              events that allow the reader to both track current events as well
              as understand how a story has unfolded.
            </StyledText>
          </Col>
          <Col xs={{ span: 2, offset: 3 }} className="mt-3 mb-3">
            <StyledHeader>Follow Us</StyledHeader>
            <Nav>
              <StyledLink>
                <BsFacebook />
              </StyledLink>
              <StyledLink>
                <BsTwitter />
              </StyledLink>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  </StyledFooter>
);

const StyledHeader = styled.div`
  font-size: 1.2em;
  color: #ffffff;
  padding-bottom: 1em;
`;

const StyledText = styled.div`
  font-size: 0.7em;
  color: #dddddd;
`;

const StyledLink = styled.div`
  font-size: 1.5em;
  color: #dddddd;
  height: 60px;
  cursor: pointer;
  margin-right: 2em;
`;

const StyledFooter = styled.div`
  background-color: #20232a !important; /* Industrial and in Control */
  border-top: 10px solid #a01d26 !important;

  background-color: #2f3131 !important; /* Modern and Urban */
  border-top: 10px solid #426e86 !important;

  background-color: #2f2e33 !important; /* Sleek and Modern */
  border-top: 10px solid #d5d6d2 !important;

  border-top: 10px solid #3a5199 !important;
  flex-shrink: none;
  margin-top: 100px;
`;

export default MainFooter;
