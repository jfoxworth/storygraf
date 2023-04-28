/*

    This page shows a user their own profile. It is not used to show
    one user another user's profile. There is a card to show the user's
    bio data, a list of tags that the user follows, and the option to 
    view the tags that the user has created.

*/

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useUser } from "../../Contexts/UserContext";

import ProfileCard from "./MyProfileCard";
import CreateTagModal from "../../modals/CreateTagModal";
import { getTagChildren } from "../../utils/api/tag";

const ProfilePage = () => {
  const userData = useUser();
  let [showCreateTag, setShowCreateTag] = useState(false);
  let [childData, setChildData] = useState([]);
  const [userParentTagMimic, setuptm] = useState({});

  useEffect(() => {
    setuptm({
      id: userData?.profileData?.id,
      type: "TAG",
      data: {
        userPoints: [],
        tagTree: [],
        type: "user",
        tagName: userData?.profileData?.data?.username,
        cumulatives: [],
        articlesList: [],
        description: "",
      },
    });
  }, [userData]);

  useEffect(() => {
    if (userData?.profileData?.id) {
      getTagChildren(userData?.profileData.id).then((data) =>
        setChildData(JSON.parse(data).Items)
      );
    }
  }, [userData]);

  const handleCreateTagClick = () => {
    setShowCreateTag(true);
  };

  const addChildItem = (newItem) => {
    setChildData([...childData, newItem]);
  };

  return (
    <>
      <CreateTagModal
        show={showCreateTag}
        setshowcreatetag={setShowCreateTag}
        parenttag={userParentTagMimic}
        userdata={userData}
        addChildItem={addChildItem}
      />

      <Container>
        <Row className={"mt-5"}></Row>
        <Row>
          <Col sm={{ span: 12, offset: 0 }} md={{ span: 8, offset: 2 }}>
            <Row className={"mt-5"}>
              <ProfileCard
                userData={userData?.profileData}
                setShowCreateTag={setShowCreateTag}
                handleCreateTagClick={handleCreateTagClick}
                addChildItem={addChildItem}
              />
            </Row>
            <Row>
              <Col>
                <h2 className="accent-bottom mb-3 pb-3">My Tags</h2>
              </Col>
            </Row>
            {childData.length === 0 && (
              <Row>
                <Col>
                  <div className={"text-center"}>
                    You have not created any tags
                  </div>
                </Col>
              </Row>
            )}
            {childData.length > 0 && (
              <Row className={"mt-1"}>
                <div>Heere</div>{" "}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
