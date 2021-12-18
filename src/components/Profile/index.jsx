import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useParams } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { API } from "aws-amplify";

import ProfileCard from "./ProfileCard";
import ProfileTags from "./ProfileTags";

const ProfilePage = () => {
  let [userData, setUserData] = useState({});
  let [profileData, setProfileData] = useState({});
  const params = useParams();

  const getThisUser = async (id) => {
    if (id) {
      await API.graphql({
        query: getUser,
        variables: { id: id },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      }).then((data) => {
        console.log(data);
        let pData = data.data.getTag;
        pData.data = JSON.parse(pData.data);
        setProfileData(pData);
      });
    } else {
      setProfileData({});
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
      console.log(data);
    });
    getThisUser(params.userId);
  }, [params.userId]);

  return (
    <Container>
      <Row className={"mt-5"}></Row>
      <Row>
        <Col sm={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
          <Row className={"mt-5"}>
            <ProfileCard profileData={profileData} />
          </Row>

          <Row className={"mt-3"}>
            <ProfileTags userData={userData} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
