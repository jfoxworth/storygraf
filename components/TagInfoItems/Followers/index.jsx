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
} from "../../../utils/api/follower";
import styles from "./styles.module.css";

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
    <div className={styles.styledFollowWrapper}>
      <Row>
        <Col xs={{ span: 2 }}>
          <div className={styles.styledFollowerIcon}>
            <BsFillPeopleFill />
          </div>
        </Col>
        <Col xs={{ span: 10 }}>
          {followStatus && (
            <>
              <div
                className={styles.styledFollowerText}
                onClick={handleUnfollowClick}
                onMouseEnter={() => setButtonText("Click to unFollow")}
                onMouseLeave={() => setButtonText(`${numFollowers} Followers`)}
              >
                {buttonText}
              </div>
            </>
          )}
          {!followStatus && (
            <>
              <div
                className={styles.styledFollowerText}
                onClick={handleFollowClick}
                onMouseEnter={() => setButtonText("Click to Follow")}
                onMouseLeave={() => setButtonText(`${numFollowers} Followers`)}
              >
                {buttonText}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FollowersBlock;
