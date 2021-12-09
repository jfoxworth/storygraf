import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Badge } from "react-bootstrap";

const Tag = ({ linkAddress, text, type }) => {
  return (
    <LinkContainer to={linkAddress ? linkAddress : "#"}>
      <h4>
        <Badge
          bg={
            type == "person"
              ? "primary"
              : type == "place"
              ? "warning"
              : type == "thing"
              ? "info"
              : "secondary"
          }
        >
          {text}
        </Badge>
      </h4>
    </LinkContainer>
  );
};

export default Tag;
