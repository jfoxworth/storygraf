/*  This is the modal popup that lets users add an item to a
    tag. An item is anything other than a child tag. This 
    could be an article, a youtube video, a tweet, or a
    facebook post.
*/
import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import AddArticle from "./AddArticle";
import FormDropdown from "../Forms/FormDropdown";
import { createItem } from "../utils/api/item";
import { checkTagItemDates } from "../utils/tags";
import { updateTag } from "../utils/api/tag";

const CreateItemModal = (props) => {
  const [itemType, setItemType] = useState("ARTICLE");
  const [source, setSource] = useState({});

  const [item, setItem] = useState({
    type: "",
    itemDate: new Date(),
    data: { userPoints: [], cumulatives: [] },
    creatorId: "",
    sourceId: "",
  });

  const handleChangeType = (event) => {
    event.preventDefault();
    setItemType(event.target.value);
  };

  // Called to add the item to the database
  const handleAddItem = (event) => {
    event.preventDefault();
    addItem(event).then((data) => {
      props.setshowcreatearticle(false);
    });
  };

  const addItem = async (event) => {
    createItem(item).then((data) => {
      props.addChildItem(JSON.parse(data));
    });
    let testTag = checkTagItemDates(props.tag, item);
    if (testTag) {
      updateTag(testTag);
      // This is to now check parent tags
    }
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Item to Tag - {props.tag.data.tagName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} xl={{ span: 10, offset: 1 }}>
              <form onSubmit={handleAddItem}>
                <FormDropdown
                  handleChange={handleChangeType}
                  value={itemType}
                  options={[
                    { value: "ARTICLE", label: "Article" },
                    { value: "YOUTUBE", label: "Youtube Video" },
                    { value: "TWITTER", label: "Twitter Post" },
                    { value: "FACEBOOK", label: "Facebook Post" },
                  ]}
                  label="Select type of Item"
                />
                {itemType === "ARTICLE" && (
                  <AddArticle
                    tag={props.tag}
                    item={item}
                    setItem={setItem}
                    source={source}
                    setSource={setSource}
                  />
                )}
              </form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setshowcreatearticle(false)}>Close</Button>
        <Button disabled={!source.id} variant="success" onClick={handleAddItem}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateItemModal;
