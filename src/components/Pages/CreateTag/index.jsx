import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const CreateTag = () => {
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

    fetch("http://localhost:3080/api/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Item: {
          parent_tag_id: "0",
          followers: 0,
          imports: 0,
          embeds: 0,
          creatorId: "User ID",
          creatorEmail: "User Email",
          data: {
            description: tagDescription,
            tagName: tagName,
            childTags: 0,
            childArticles: 0,
          },
        },
      }),
    }).then((response) => {
      console.log(response.data);
    });
    setTagName("");
    setTagDescription("");
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
