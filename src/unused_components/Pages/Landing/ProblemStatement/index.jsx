import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardItem from "../Shared/CardItem";
import styled from "styled-components";

const ProblemStatement = () => {
  return (
    <Container>
      <Row>
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          xl={{ span: 8, offset: 2 }}
        >
          <h3 className="font-weight-medium text-dark titleFont">
            The Problem
          </h3>
          <DescText className="bodyFont mb-2">
            Modern news outlets report on stories as they break, adding pieces
            of info in small chunks on an article per article basis.
          </DescText>
          <CardItem
            cardTitle={"Missing Info"}
            cardText={
              "No single news outlet covers every aspect of any story and each article covers only one part of a story."
            }
          />
          <CardItem
            cardTitle={"Unorganized Stories"}
            cardText={
              "Finding related articles with a single source is difficult and leads to googling read the same info over and over again."
            }
          />
          <CardItem
            cardTitle={"No Context"}
            cardText={
              "Articles never explained the events leading up to the current situaton - meaning that readers often have to search."
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

const DescText = styled.div`
  color: rgb(145, 147, 150);
  font-size: 16px;
`;

export default ProblemStatement;
