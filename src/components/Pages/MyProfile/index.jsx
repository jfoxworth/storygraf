/*

    This page shows a user their own profile. It is not used to show
    one user another user's profile. There is a card to show the user's
    bio data, a list of tags that the user follows, and the option to 
    view the tags that the user has created.

*/

import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useUser } from "../../Contexts/UserContext";

import CreateTagModal from "../../shared/CreateTagModal";

const ProfilePage = () => {
  const userData = useUser();
  let [showCreateTag, setShowCreateTag] = useState(false);

  const handleCreateTagClick = () => {
    setShowCreateTag(true);
  };

  return (
    <>
      <CreateTagModal
        show={showCreateTag}
        setshowcreatetag={setShowCreateTag}
        parenttag={"USER" + userData.profileData.id}
        userdata={userData}
      />

      <Container>
        <Row className={"mt-5"}></Row>
        <Row>
          <Col sm={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
            <Row className={"mt-5"}></Row>

            <Row className={"mt-3"}></Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
