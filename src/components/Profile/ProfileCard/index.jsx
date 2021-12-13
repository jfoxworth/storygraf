import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../../main.css";

const ProfileCard = ({ userData, profileData }) => {
  console.log(userData);
  console.log(profileData);
  return (
    <>
      <Container>
        <Row>
          <div className={"imageHolder avatars1-image-large avatar1-1"}></div>
        </Row>
      </Container>
    </>
  );
};

export default ProfileCard;
