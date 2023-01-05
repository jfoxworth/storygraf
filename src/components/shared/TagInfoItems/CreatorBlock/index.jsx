/*
    This item shows the number of followers and whether or not 
    the current user is following this tag
*/
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { getUser } from "../../utils/api/user";

const CreatorBlock = ({ tag }) => {
  const [creatorData, setCreatorData] = useState({});

  useEffect(() => {
    getUser(tag.creatorId).then((data) => {
      setCreatorData(JSON.parse(data).Items[0]);
    });
  }, [tag]);

  return (
    <StyledUserWrapper>
      <Row>
        <Col xs={{ span: 2 }}>
          <StyledUserIcon>
            <div
              className={"imageHolder avatars1-image-nav avatar1-43 center-me"}
            ></div>
          </StyledUserIcon>
        </Col>
        <Col xs={{ span: 10 }}>
          <StyledUserText>{creatorData?.data?.username}</StyledUserText>
        </Col>
      </Row>
    </StyledUserWrapper>
  );
};

const StyledUserWrapper = styled.div`
  font-size: 1em;
  color: #9fa6b2;
  width: 100%;
  padding: 0px 0px 3px 0px;
  border-bottom: 1px solid #9fa6b2;
  margin-bottom: 0.75em;
`;

const StyledUserIcon = styled.div`
  font-size: 1em;
  text-align: center;
`;

const StyledUserText = styled.div`
  display: inline-block;
`;

export default CreatorBlock;
