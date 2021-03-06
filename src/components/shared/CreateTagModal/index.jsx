import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { API } from "aws-amplify";
import { createTag, createTagRelation } from "../../../graphql/mutations";
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
      addTagRelation(
        data.data.createTag.id,
        props.parenttag ? props.parenttag.id : 0
      );
      props.setshowcreatetag(false);
    });
  };

  const addTag = async (event) => {
    const input = {
      name: tagName,
      creatorId: props.userdata.username,
      data: JSON.stringify({
        color: tagColor,
        textcolor: textColor,
        description: tagDescription,
        cumulatives: cumulatives,
      }),
      frontpage: true,
      official: true,
      type: tagType,
    };

    setTagName("");
    setTagColor("#898989");
    setTextColor("#FFFFFF");

    return await API.graphql({
      query: createTag,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
  };

  const addTagRelation = async (thisId, parentId) => {
    const input = {
      parentId: parentId,
      childId: thisId,
      creatorId: props.userdata.username,
    };
    return await API.graphql({
      query: createTagRelation,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
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

            <Row>
              <Col xs={12} lg={{ span: 8, offset: 2 }} className={"mt-3"}>
                <h4>Cumulative Items</h4>
                {cumulatives.map((cumItem, i) => (
                  <FormInput
                    key={`cumulative${i}`}
                    name={`cumulative${i}`}
                    icon="Cube"
                    value={cumItem}
                    className={"mb-1"}
                    handleChange={handleCumulativeChange}
                  />
                ))}
                <Button variant={"success"} onClick={handleAddCumulative}>
                  Add Cumulative
                </Button>
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
