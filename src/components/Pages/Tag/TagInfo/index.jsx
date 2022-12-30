/*
    This component is displayed at the top of the tag page.
    It shows the tag stack, description, and tag info
*/

import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import DateBlock from "../../../shared/DateBlock";
import TagStack from "../../../shared/TagStack";
import TagEdit from "../TagEdit";
import { useUser } from "../../../Contexts/UserContext";
import Cumulative from "../../../shared/Cumulative";

const TagInfo = ({ tag, addChildItem }) => {
  const userData = useUser();
  const [showDesc, setShowDesc] = useState(tag.data?.description);

  useEffect(() => {
    setShowDesc(tag?.data?.description);
  }, [tag]);

  const tagType = tag?.data?.type || "No Type Set";

  return (
    <>
      <Row className={"mt-3 titleFont"}>
        <Col xs={{ order: 1 }} sm={{ order: 1 }}>
          <TagStack
            tagStack={tag.data?.tagTree.concat(tag)}
            variant={"inline"}
          />
          <div className={"my-3 text-muted"}>{showDesc}</div>
          {tag.data.cumulatives?.map((cum, ci) => (
            <Cumulative key={`cumulativeItem${ci}`} cumItem={cum} />
          ))}
        </Col>
        <Col xs={{ order: 2 }} sm={{ order: 2 }}>
          <Row>
            <Col className={"bold right-text"}>
              <Row className="mt-3">
                <strong>Tag Owner :</strong>
              </Row>
              <Row className="mt-3">
                <strong>Tag Type :</strong>
              </Row>
              <Row className="mt-3">
                <strong>Created :</strong>
              </Row>
            </Col>

            <Col className={"bold left-text"}>
              <Row className="mt-3">
                <span>{tag.data.userName}</span>
              </Row>
              <Row className="mt-3">
                <span>{tagType[0].toUpperCase() + tagType.substring(1)}</span>
              </Row>
              <Row className="mt-3">
                <span>
                  <DateBlock dateString={tag.created_at} />
                </span>
              </Row>
            </Col>
          </Row>
          {tag.creatorId === userData.profileData?.id && (
            <Row>
              <TagEdit
                tag={tag}
                addChildItem={addChildItem}
                setShowDesc={setShowDesc}
              />
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default TagInfo;
