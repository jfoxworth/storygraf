/*

  This page is only intended to be used by admin. It creates a top level tag
  that has a 0 top level parent ID
*/

import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useUser } from "../../Contexts/UserContext";
import { createTag } from "../../shared/utils/api/tag";

const CreateTag = () => {
  const userData = useUser();

  let [tagName, setTagName] = useState("");
  const handleChangeTagName = (event) => {
    setTagName(event.target.value);
  };

  let [tagDescription, setTagDescription] = useState("");
  const handleChangeTagDescription = (event) => {
    setTagDescription(event.target.value);
  };

  const handleAddTag = async (event) => {
    event.preventDefault();

    createTag({
      parent_tag_id: "0",
      followers: 0,
      imports: 0,
      embeds: 0,
      creatorId: userData.profileData.data.id,
      creatorEmail: userData.profileData.data.email,
      data: {
        description: tagDescription,
        tagName: tagName,
        tagColor: "#898989",
        textColor: "#FFFFFF",
        articlesList: [],
        userName: userData.profileData.data.username,
        tagTree: [],
        articlesListLimit: 5,
        cumulatives: [],
        userPoints: [],
      },
    }).then((data) => {
      setTagName("");
      setTagDescription("");
    });
  };

  return (
    <>
      <Container>
        <form onSubmit={handleAddTag}>
          <Row className="mt-5"></Row>
          <h3 className={"text-center mt-5 mb-5"}>Create a Tag</h3>
          <Row>
            <Col xs={3}></Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <FormInput
                    className="mt-5"
                    type="text"
                    name="tagName"
                    icon="Cube"
                    placeholder="Enter tag name"
                    label="Name of tag"
                    value={tagName}
                    handleChange={handleChangeTagName}
                  />
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="tagDesc">
                    <Form.Label>Description of Tag</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={handleChangeTagDescription}
                    />
                  </Form.Group>{" "}
                </Col>
              </Row>
              <Row className={"mt-3"}>
                <Col xs="4"></Col>
                <Col xs="4">
                  <Button
                    className="w-100"
                    variant="primary"
                    onClick={handleAddTag}
                  >
                    Create New Tag
                  </Button>
                </Col>
                <Col xs="4"></Col>
              </Row>
            </Col>
            <Col xs={3}></Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default CreateTag;
