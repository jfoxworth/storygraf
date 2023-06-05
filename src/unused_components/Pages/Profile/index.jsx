/*

  This page shows the user their profile data, the tags
  that they follow, and the tags that they have created.

  This is a user viewing their own page. A different page
  is used to view another user's profile and their tags.

*/

import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useUser } from "../../Contexts/UserContext";
import { useParams } from "react-router-dom";

import MyProfileCard from "./ProfileCard";

const ProfilePage = () => {
  const userData = useUser();
  const params = useParams();

  useEffect(() => {}, [params.userId]);

  return (
    <Container>
      <Row className={"mt-5"}></Row>
      <Row>
        <Col sm={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
          <Row className={"mt-5"}>
            <MyProfileCard userData={userData.profileData} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
