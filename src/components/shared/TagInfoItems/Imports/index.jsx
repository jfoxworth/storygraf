import React from "react";
import { Row, Col } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import styled from "styled-components";

const ImportsBlock = ({ numImports }) => {
  return (
    <StyledImportWrapper>
      <Row>
        <Col xs={{ span: 2 }}>
          <StyledImportIcon>
            <BsUpload />
          </StyledImportIcon>
        </Col>
        <Col xs={{ span: 10 }}>
          <StyledImportText>{numImports} Imports</StyledImportText>
        </Col>
      </Row>
    </StyledImportWrapper>
  );
};

const StyledImportWrapper = styled.div`
  font-size: 1em;
  color: #426e86;
  width: 100%;
  padding: 0px 0px 3px 0px;
  border-bottom: 1px solid #426e86;
  margin-bottom: 0.75em;
`;

const StyledImportIcon = styled.div`
  font-size: 1em;
  text-align: center;
`;

const StyledImportText = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export default ImportsBlock;
