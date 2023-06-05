/*
 *
    This component is the small block that contains the text of the tag and
    has the background color and text color for the tag. There is code there
    to display buttons to add an article or tag. This was intended to let
    a user add a child tag or article when viewing that tag as a child. I 
    think that I will deprecate this.
 *
 */

import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "../../../main.css";
import styled from "styled-components";

const Tag = ({ tag = {}, variant = "standard" }) => {
  return (
    <>
      <LinkContainer to={`/Tag/${tag.parent_tag_id}/${tag.id}`}>
        <TagBlock>
          <TagInner tag={tag} variant={variant}>
            {tag.data?.tagName}
          </TagInner>
        </TagBlock>
      </LinkContainer>
    </>
  );
};

const TagBlock = styled.div`
  display: inline-block;
  line-height: 1.2;
`;

const TagInner = styled.div`
  background-color: ${(props) => props.tag.data?.tagColor || "#3a5199"};
  color: ${(props) => props.tag.data?.textColor || "#FFFFFF"};
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: ${(props) => (props.variant = "inline" ? "0.75em" : "1em")};
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export default Tag;
