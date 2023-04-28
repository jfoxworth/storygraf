/*
    This item shows the number of followers and whether or not 
    the current user is following this tag
*/
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { getUser } from "../../../utils/api/user";
import styles from "./styles.module.css";

const CreatorBlock = ({ tag }) => {
  const [creatorData, setCreatorData] = useState({});

  useEffect(() => {
    getUser(tag.creatorId || "01GN5EG33E1HGFV4TYRKF9SV1R").then((data) => {
      if (JSON.parse(data)?.Items) setCreatorData(JSON.parse(data)?.Items[0]);
    });
  }, [tag]);

  return (
    <div className={styles.styledUserWrapper}>
      <Row>
        <Col xs={{ span: 2 }}>
          <div className={styles.styledUserIcon}>
            <div
              className={"imageHolder avatars1-image-nav avatar1-43 center-me"}
            ></div>
          </div>
        </Col>
        <Col xs={{ span: 10 }}>
          <div className={styles.styledUserText}>
            {creatorData?.data?.username}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CreatorBlock;
