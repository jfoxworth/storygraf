import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import HeroSection from "./HeroSection";
import ProblemStatement from "./ProblemStatement";
import SolutionStatement from "./SolutionStatement";
import Testimonial from "./Testimonial";
import HowItWorks from "./HowItWorks";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <Container>
        <Row>
          <Col xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 0 }}>
            <ProblemStatement />
          </Col>
          <Col xs={{ span: 12, offset: 0 }} lg={{ span: 6, offset: 0 }}>
            <SolutionStatement />
          </Col>{" "}
        </Row>
      </Container>
      <Row>
        <Testimonial />
      </Row>
      <Row>
        <HowItWorks />
      </Row>
    </>
  );
};

export default LandingPage;
