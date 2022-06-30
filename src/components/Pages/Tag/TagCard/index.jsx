// Deprecated

import React from "react";
import { Container, Card } from "react-bootstrap";

const TagCard = ({ tag }) => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{tag.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{tag.type}</Card.Subtitle>
          <Card.Text>{tag.data.description}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {tag.createdAt}
          </Card.Subtitle>
        </Card.Body>
      </Card>{" "}
    </Container>
  );
};

export default TagCard;
