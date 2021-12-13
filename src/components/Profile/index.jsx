import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useParams } from "react-router-dom";
import { getUser } from "../../graphql/queries";
import { API } from "aws-amplify";

import ProfileCard from "./ProfileCard";

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
    <>
      <Container>
        <Row className={"mt-5"}></Row>
        <Row className={"mt-3"}>
          <Col
            xs={{ span: 12, order: 1 }}
            sm={{ span: 4, order: 1, offset: 2 }}
          >
            <ProfileCard userData={userData} profileData={profileData} />
          </Col>
          <Col
            xs={{ span: 12, order: 2 }}
            sm={{ span: 4, order: 2, offset: 0 }}
          >
            List of data
          </Col>
        </Row>

        <Row></Row>
      </Container>
    </>
  );
};

export default ProfilePage;
