import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "./styles.module.css";

const ProfileCard = ({ userData, handleCreateTagClick }) => {
  return (
    <Row className="">
      <Row>
        <Col>
          <h2 className="accent-bottom mb-3 pb-3">User Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 12, order: 1 }} lg={{ span: 6, order: 1 }}>
          <Row>
            <div
              className={
                "imageHolder avatars1-image-large avatar1-43 center-me"
              }
            ></div>
          </Row>
        </Col>
        <Col sm={{ span: 12, order: 2 }} lg={{ span: 6, order: 2 }}>
          <Row className="mt-3">
            <Col className={""}>
              <strong>Email :</strong>
            </Col>
            <Col>{userData?.data?.email}</Col>
          </Row>
          <Row className="mt-3">
            <Col className={"bold"}>
              <strong>User Name :</strong>
            </Col>
            <Col>{userData?.data?.username}</Col>
          </Row>

          <Row className="mt-3">
            <Col className={"text-center"} xs={{ span: 6, offset: 3 }}>
              <Link href={`/MyGraf`}>
                <div className={styles.grafButton}>Go to my graph</div>
              </Link>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className={"text-center"} xs={{ span: 6, offset: 3 }}>
              <Button
                className={"w-100"}
                variant="success"
                onClick={() => handleCreateTagClick("")}
              >
                Create New Tag
              </Button>{" "}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Row className="mt-3">
            <strong>Bio</strong>
          </Row>
          <Row className="mt-3">
            <p>
              I am a news hound. I like to connect the dots and see how the
              story unfolds over time. The idea of linking and grouping stories
              with respect to time and subject is very interesting to me.{" "}
            </p>
            <p>
              Feel free to link my tags within yours and message me to
              collaborate.
            </p>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default ProfileCard;
