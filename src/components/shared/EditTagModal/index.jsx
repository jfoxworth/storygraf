import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Tag from "../Tag";
import FormDropdown from "../../shared/Forms/FormDropdown";

const EditTagModal = (props) => {
  let [tagName, setTagName] = useState(props.tag.data.tagName);
  const handleChangeTagName = (event) => {
    setTagName(event.target.value);
  };

  let [tagColor, setTagColor] = useState(props.tag.data.tagColor);
  const handleChangeTagColor = (event) => {
    setTagColor(event.target.value);
  };

  let [textColor, setTextColor] = useState(props.tag.data.textColor);
  const handleChangeTextColor = (event) => {
    setTextColor(event.target.value);
  };

  let [tagDescription, setTagDescription] = useState(
    props.tag.data.description
  );
  const handleChangeTagDescription = (event) => {
    setTagDescription(event.target.value);
    props.setShowDesc(event.target.value);
  };

  let [tagType, setTagType] = useState(props.tag.data.type);
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

  const handleEditTag = (event) => {
    event.preventDefault();
    fetch("http://localhost:3080/api/tag", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Item: {
          ...props.tag,
          data: {
            description: tagDescription,
            tagName: tagName,
            type: tagType,
            childTags: props.tag.data.childTags || 0,
            childArticles: props.tag.data.childArticles || 0,
            textColor: textColor,
            tagColor: tagColor,
          },
        },
      }),
    }).then((response) => {
      console.log(response);
      props.setshowedittag(false);
    });
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tag - {props.tag.data.tagName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={handleEditTag}>
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
                  title="Choose your color"
                  value={tagColor}
                />
              </Col>
              <Col xs={1} className={"mt-4"}>
                <Form.Control
                  type="color"
                  onChange={handleChangeTextColor}
                  id="tagTextcolor"
                  title="Choose the text color"
                  value={textColor}
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
                    value={tagDescription}
                    onChange={handleChangeTagDescription}
                  />
                </Form.Group>{" "}
              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                {props.tag.id !== 0 && (
                  <Row>
                    <Col xs={"auto"}>
                      <Tag
                        tag={{
                          ...props.tag,
                          data: {
                            ...props.tag.data,
                            tagColor: tagColor,
                            textColor: textColor,
                          },
                        }}
                        showAdds={false}
                      />
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setshowedittag(false)}>Close</Button>
        <Button variant="success" onClick={handleEditTag}>
          Update Tag
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTagModal;
