import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

import HeroSection from "./landing/HeroSection";
import ProblemStatement from "./landing/ProblemStatement";
import SolutionStatement from "./landing/SolutionStatement";
import Testimonial from "./landing/Testimonial";
import HowItWorks from "./landing/HowItWorks";

export default function Home() {
  return (
    <>
      <Head>
        <title>New Storygraf</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
}
