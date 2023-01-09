/*
    This item shows the number of followers and whether or not 
    the current user is following this tag
*/
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  createUserTagFollower,
  getUserTagFollower,
  deleteUserTagFollower,
} from "../../../shared/utils/api/follower";
import styled from "styled-components";

const FollowersBlock = ({ parentTagId, tagId, userId, numFollowers }) => {
  const [followStatus, setFollowStatus] = useState(false);
  const [buttonText, setButtonText] = useState("Not Following");

  useEffect(() => {
    getUserTagFollower(parentTagId, tagId, userId).then((data) => {
      setFollowStatus(JSON.parse(data).id !== undefined);
    });
  }, [parentTagId, tagId, userId]);

  useEffect(() => {
    if (followStatus) {
      setButtonText(`${numFollowers} Followers`);
    }
    if (!followStatus) {
      setButtonText(`${numFollowers} Followers`);
    }
  }, [followStatus, numFollowers]);

  const handleFollowClick = () => {
    createUserTagFollower(tagId, parentTagId, userId).then((data) => {
      setFollowStatus(true);
    });
  };

  const handleUnfollowClick = () => {
    deleteUserTagFollower(tagId, parentTagId, userId).then((data) => {
      setFollowStatus(false);
    });
  };

  return (
    <StyledFollowWrapper>
      <Row>
        <Col xs={{ span: 2 }}>
          <StyledFollowerIcon>
            <BsFillPeopleFill />
          </StyledFollowerIcon>
        </Col>
        <Col xs={{ span: 10 }}>
          {followStatus && (
            <>
              <StyledFollowerText
                onClick={handleUnfollowClick}
                onMouseEnter={() => setButtonText("Click to unFollow")}
                onMouseLeave={() => setButtonText(`${numFollowers} Followers`)}
              >
                {buttonText}
              </StyledFollowerText>
            </>
          )}
          {!followStatus && (
            <>
              <StyledFollowerText
                onClick={handleFollowClick}
                onMouseEnter={() => setButtonText("Click to Follow")}
                onMouseLeave={() => setButtonText(`${numFollowers} Followers`)}
              >
                {buttonText}
              </StyledFollowerText>
            </>
          )}
        </Col>
      </Row>
    </StyledFollowWrapper>
  );
};

const StyledFollowWrapper = styled.div`
  font-size: 1em;
  color: #14a44d;
  width: 100%;
  padding: 0px 0px 3px 0px;
  border-bottom: 1px solid #14a44d;
  margin-bottom: 0.75em;
`;

const StyledFollowerIcon = styled.div`
  font-size: 1em;
  text-align: center;
`;

const StyledFollowerText = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export default FollowersBlock;
