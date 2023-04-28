import React, { useState } from "react";
import FormInput from "../../components/Forms/FormInput";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import Tag from "../../components/Tag";
import { useUser } from "../../Contexts/UserContext";
import { createTag } from "../../utils/api/tag";
import { createTagLatestItems } from "../../utils/api/tagLatestItems";

const CreateTagModal = (props) => {
  const userData = useUser();

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

  const handleAddTag = (event) => {
    event.preventDefault();
    addTag(event).then((data) => {
      props.setshowcreatetag(false);
    });
  };

  const addTag = async (event) => {
    const tagTree = props?.parenttag?.data?.tagTree || [];
    createTag({
      parent_tag_id: props?.parenttag.id,
      followers: 0,
      imports: 0,
      embeds: 0,
      creatorId: userData?.profileData?.id,
      creatorEmail: userData?.profileData?.data?.email,
      data: {
        articlesList: [],
        articleListLimit: 5,
        userName: userData?.profileData.data.username,
        description: tagDescription,
        tagName: tagName,
        tagColor: tagColor,
        textColor: textColor,
        userPoints: [],
        cumulatives: [],
        tagTree: tagTree.concat({
          ...props.parenttag,
          articlesList: [],
          PK: "",
          SK: "",
        }),
      },
    }).then((data) => {
      createTagLatestItems(JSON.parse(data).id, [], props?.parenttag.id);
      props.addChildTag(JSON.parse(data));
      setTagName("");
      setTagColor("#898989");
      setTextColor("#FFFFFF");
      setTagDescription("");
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
                  id="textcolor"
                  defaultValue="#FFFFFF"
                  title="Choose the text color"
                />
              </Col>{" "}
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
        {userData?.profileData?.id && (
          <Button variant="success" onClick={handleAddTag}>
            Create Tag
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTagModal;
