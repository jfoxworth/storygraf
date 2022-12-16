import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Tag from "../Tag";
import FormDropdown from "../../shared/Forms/FormDropdown";

const CreateTagModal = (props) => {
  let [tagName, setTagName] = useState("");
  const handleChangeTagName = (event) => {
    setTagName(event.target.value);
  };

  let [tagColor, setTagColor] = useState("#898989");
  const handleChangeTagColor = (event) => {
    setTagColor(event.target.value);
  };

  let [textColor, setTextColor] = useState("#FFFFFF");
  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
  };

  let [tagDescription, setTagDescription] = useState("");
  const handleChangeTagDescription = (event) => {
    setTagDescription(event.target.value);
  };

  let [tagType, setTagType] = useState("");
  const handleChangeTagType = (event) => {
    setTagType(event.target.value);
  };

  let [cumulatives, setCumulatives] = useState([]);
  const handleAddCumulative = (event) => {
    setCumulatives(cumulatives.concat(["Cumulative Property"]));
  };

  const handleCumulativeChange = (event) => {
    let temp = [];
    cumulatives.forEach((cumItem) => {
      temp.push(cumItem);
    });
    const index = parseInt(event.target.name.replace("cumulative", ""));
    temp[index] = event.target.value;
    setCumulatives(temp);
  };

  const handleAddTag = (event) => {
    event.preventDefault();
    addTag(event).then((data) => {
      props.setshowcreatetag(false);
    });
  };

  const addTag = async (event) => {
    fetch("http://localhost:3080/api/tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Item: {
          parent_tag_id: props.parenttag.id,
          followers: 0,
          imports: 0,
          embeds: 0,
          creatorId: "User ID",
          creatorEmail: "User Email",
          data: {
            description: tagDescription,
            tagName: tagName,
            color: tagColor,
            textcolor: textColor,
            description: tagDescription,
            type: tagType,
          },
        },
      }),
    }).then((response) => {
      console.log(response.data);
    });
    setTagName("");
    setTagColor("#898989");
    setTextColor("#FFFFFF");
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={handleAddTag}>
            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                {props.parenttag.id !== 0 && (
                  <Row>
                    <Col xs={"auto"}>
                      <div>Parent Tag</div>
                    </Col>
                    <Col xs={"auto"}>
                      <Tag tag={props.parenttag} showAdds={false} />
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                {props.parenttag.id === 0 && (
                  <p>
                    This tag will be created and placed at the top level with no
                    parent. It can be included within any other tag or have tags
                    added beneath it.
                  </p>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={10} lg={{ span: 6, offset: 2 }}>
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
              </Col>{" "}
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }}>
                <FormDropdown
                  handleChange={handleChangeTagType}
                  value={tagType}
                  options={[
                    { value: "event", label: "Event" },
                    { value: "person", label: "Person" },
                    { value: "place", label: "Place" },
                    { value: "thing", label: "Thing" },
                    { value: "category", label: "Category" },
                    { value: "opinion", label: "Opinion" },
                  ]}
                  label="Select type for tag"
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
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
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setshowcreatetag(false)}>Close</Button>
        <Button variant="success" onClick={handleAddTag}>
          Create Tag
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTagModal;
