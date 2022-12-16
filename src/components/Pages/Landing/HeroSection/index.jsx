import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const HeroSection = () => {
  return (
    <SlopedContainer>
      <Container>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
          >
            <HeroText className="mt-8 pt-4 titleFont">Redefining News</HeroText>
            <SubText className="mt-4 bodyFont greyText">
              The news is broken up into segmented pieces of info.
            </SubText>
            <SubText className="bodyFont greyText">
              Storygraf puts it in chronologocal order and gives it context -
              telling the full story.
            </SubText>
          </Col>
        </Row>
      </Container>
    </SlopedContainer>
  );
};

const SlopedContainer = styled.div`
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw));
  background-image: linear-gradient(
      0deg,
      rgba(235, 235, 235, 0.9),
      rgba(235, 235, 235, 0.9)
    ),
    url("https://storygraf.s3.us-east-2.amazonaws.com/Landing/newscollage1.jpg");
  background-size: cover;
  min-height: 500px;
  color: #000;
  padding: 4em 0 4em 0;
`;

const HeroText = styled.div`
  font-size: 4em;
  text-align: center;
`;

const SubText = styled.div`
  font-size: 1.2em;
  text-align: center;
`;

export default HeroSection;
