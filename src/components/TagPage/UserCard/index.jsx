import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../../main.css";

const UserCard = ({ userData }) => {
  return (
    <Row className="mt-1">
      <Row>
        <Col>
          <Row>
            <div
              className={
                "imageHolder avatars1-image-large avatar1-43 center-me"
              }
            ></div>
          </Row>
          <Row className="mt-3">
            <Col className={"bold right-text"}>
              <strong>User Name :</strong>
            </Col>
            <Col>The Wolf</Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default UserCard;
