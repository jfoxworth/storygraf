import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsGeoAltFill,
  BsFillPlayCircleFill,
  BsWrench,
} from "react-icons/bs";

const Tag = ({ tag }) => {
  console.log(tag);
  return (
    <LinkContainer to={`/tag/${tag.id}`}>
      <h4>
        <Button
          style={{ backgroundColor: tag.data.color, color: tag.data.textColor }}
        >
          {tag.name}
          {tag.type === "person" && <BsFillPersonFill className={"mx-1"} />}
          {tag.type === "place" && <BsGeoAltFill className={"mx-1"} />}
          {tag.type === "thing" && <BsWrench className={"mx-1"} />}
          {tag.type === "event" && <BsFillPlayCircleFill className={"mx-1"} />}
        </Button>
      </h4>
    </LinkContainer>
  );
};

export default Tag;
