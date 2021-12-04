import React, { useState } from "react";
import FormInput from "../shared/Forms/FormInput";
import FormDropdown from "../shared/Forms/FormDropdown";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { createTag } from "../../graphql/mutations";
import { Auth } from "aws-amplify";

const CreateNewTag = () => {
  let userData = "";
  Auth.currentAuthenticatedUser({ bypassCache: true }).then(
    (data) => (userData = data)
  );
  let [tagName, setTagName] = useState("");
  const handleChangeTagName = (event) => {
    setTagName(event.target.value);
  };

  let [tagType, setTagType] = useState("");
  const handleChangeTagType = (event) => {
    setTagType(event.target.value);
  };

  let [tagColor, setTagColor] = useState("#898989");
  const handleChangeTagColor = (event) => {
    setTagColor(event.target.value);
  };

  let [textColor, setTextColor] = useState("#FFFFFF");
  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
  };

  const handleAddTag = async (event) => {
    event.preventDefault();
    const input = {
      name: tagName,
      creatorId: userData.username,
      data: JSON.stringify({
        color: tagColor,
        textcolor: textColor,
      }),
      frontpage: true,
      official: true,
      type: tagType,
    };
    //    await API.graphql(graphqlOperation(createTag, { input }));
    await API.graphql({
      query: createTag,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    setTagName("");
    setTagColor("#898989");
    setTagType("");
    setTextColor("#FFFFFF");
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
                <Col xs={10}>
                  <FormInput
                    className="mt-5"
                    type="text"
                    name="tagName"
                    icon="Cube"
                    placeholder="Enter name for tag here"
                    label="Name and color for tag and then for text"
                    value={tagName}
                    handleChange={handleChangeTagName}
                  />
                </Col>

                <Col xs={1} className={"mt-4"}>
                  <Form.Control
                    type="color"
                    onChange={handleChangeTagColor}
                    id="tagcolor"
                    defaultValue="#563d7c"
                    title="Choose your color"
                  />
                </Col>

                <Col xs={1} className={"mt-4"}>
                  <Form.Control
                    type="color"
                    onChange={handleChangeTextColor}
                    id="tagcolor"
                    defaultValue="#FFFFFF"
                    title="Choose the text color"
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={10}>
                  <FormDropdown
                    handleChange={handleChangeTagType}
                    options={[
                      { value: "event", label: "Event" },
                      { value: "person", label: "Person" },
                      { value: "place", label: "Place" },
                      { value: "thing", label: "Thing" },
                    ]}
                    label="Select type for tag"
                  />
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

export default CreateNewTag;
