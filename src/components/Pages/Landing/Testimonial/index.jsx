import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const Testimonial = () => {
  return (
    <SlopedContainer>
      <Container>
        <Row>
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            xl={{ span: 6, offset: 3 }}
          >
            <InitialText className="mt-8 pt-4 titleFont">
              What We DO
            </InitialText>
            <QuoteText className="mt-4 bodyFont">"</QuoteText>
            <QuotedText className="bodyFont">
              Storygraf organizes indiviual news articles into a concise
              timeline conveying the full story.
            </QuotedText>
            <SourceText className="mt-8 pt-4 titleFont">
              Joshua Foxworth - Founder
            </SourceText>
          </Col>
        </Row>
      </Container>
    </SlopedContainer>
  );
};

const SlopedContainer = styled.div`
  clip-path: polygon(0 6vh, 100% 0, 100% calc(100% - 6vw), 0 100%);
  background-image: linear-gradient(
    0deg,
    rgba(220, 220, 220, 1),
    rgba(220, 220, 220, 1)
  );
  background-size: cover;
  min-height: 500px;
  color: #000;
  padding: 2em 0 2em 0;
  margin: 4em 0;
`;

const InitialText = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.7em;
  text-align: center;
  letter-spacing: 0.2em;
`;

const QuoteText = styled.div`
  font-size: 4em;
  text-align: center;
  font-style: italic;
`;

const QuotedText = styled.div`
  font-size: 2em;
  text-align: center;
  font-style: italic;
  letter-spacing: 0.1em;
`;

const SourceText = styled.div`
  font-size: 1em;
  text-align: center;
  letter-spacing: 0.1em;
`;

export default Testimonial;
