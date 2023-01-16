import React from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import ArticleLine from "../ArticleLine";
import { useUser } from "../../Contexts/UserContext";
import { deleteItem } from "../utils/api/item";

const DeleteItemModal = (props) => {
  const userData = useUser();

  const handleDeleteItem = (event) => {
    event.preventDefault();
    deleteThisItem(event).then((data) => {
      props.setshowdeleteitem(false);
    });
  };

  const deleteThisItem = async (event) => {
    deleteItem(props.item);
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete an item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <form onSubmit={handleDeleteItem}>
            <Row>
              <ArticleLine article={props.item} />
            </Row>
          </form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setshowdeleteitem(false)}>Close</Button>
        {userData?.profileData?.id && (
          <Button variant="success" onClick={handleDeleteItem}>
            Delete Item
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteItemModal;
