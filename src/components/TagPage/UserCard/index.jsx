import React from "react";
import { Container, Card } from "react-bootstrap";

const UserCard = ({ userData }) => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{userData.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">sub</Card.Subtitle>
          <Card.Text>wfwe</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {userData.createdAt}
          </Card.Subtitle>
        </Card.Body>
      </Card>{" "}
    </Container>
  );
};

export default UserCard;
