import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsStack } from "react-icons/bs";
import styled from "styled-components";

const EmbedsBlock = ({ numEmbeds }) => {
  return (
    <StyledEmbedWrapper>
      <Row>
        <Col xs={{ span: 2 }}>
          <StyledEmbedIcon>
            <BsStack />
          </StyledEmbedIcon>
        </Col>
        <Col xs={{ span: 10 }}>
          <StyledEmbedText>{numEmbeds} Embeds</StyledEmbedText>
        </Col>
      </Row>
    </StyledEmbedWrapper>
  );
};

const StyledEmbedWrapper = styled.div`
  font-size: 1em;
  color: #2f2e33;
  width: 100%;
  padding: 0px 0px 3px 0px;
  border-bottom: 1px solid #2f2e33;
  margin-bottom: 0.75em;
`;

const StyledEmbedIcon = styled.div`
  font-size: 1em;
  text-align: center;
`;

const StyledEmbedText = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export default EmbedsBlock;
