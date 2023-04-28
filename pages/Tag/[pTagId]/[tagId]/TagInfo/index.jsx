/*
    This component is displayed at the top of the tag page.
    It shows the tag stack, description, and tag info
*/

// React and Next items
import React, { useState, useEffect } from "react";

// Bootstrap items
import { Row, Col } from "react-bootstrap";

// My components
import TagStack from "../../../../../components/TagStack";
import TagEdit from "../TagEdit";
import Cumulative from "../../../../../components/Cumulative";

import FollowersBlock from "../../../../../components/TagInfoItems/Followers";
import CreatorBlock from "../../../../../components/TagInfoItems/CreatorBlock";
import Date from "../../../../../components/TagInfoItems/Date";
import EmbedsBlock from "../../../../../components/TagInfoItems/Embeds";
import ImportsBlock from "../../../../../components/TagInfoItems/Imports";

// Contexts
import { useUser } from "../../../../../Contexts/UserContext";

const TagInfo = ({
  tag,
  setThisTag,
  addChildItem,
  addChildTag,
  cumulatives,
  setCumulatives,
}) => {
  const userData = useUser();
  const [showDesc, setShowDesc] = useState(tag?.data?.description);

  useEffect(() => {
    setShowDesc(tag?.data?.description);
  }, [tag]);

  return (
    <>
      <Row className={"my-3 titleFont"}>
        <Col>
          <TagStack
            tagStack={tag?.data?.tagTree.concat(tag)}
            variant={"inline"}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ order: 1, span: 6 }}>
          <div className={"my-3 text-muted"}>{showDesc}</div>
          {tag?.data.cumulatives?.map((cum, ci) => (
            <Cumulative key={`cumulativeItem${ci}`} cumItem={{ ...cum }} />
          ))}
        </Col>
        <Col xs={{ order: 2, span: 5, offset: 1 }}>
          <Row>
            <Col xs={{ span: 6 }}>
              <CreatorBlock tag={tag} />
              <Date dateString={tag?.created_at} />
            </Col>
            <Col xs={{ span: 6 }}>
              <FollowersBlock
                numFollowers={tag?.followers}
                tagId={tag?.id}
                parentTagId={tag?.parent_tag_id}
                userId={userData?.profileData?.id}
              />
              <EmbedsBlock numEmbeds={tag?.embeds} />
              <ImportsBlock numImports={tag?.imports} />
            </Col>
            {tag?.creatorId === userData?.profileData?.id && (
              <TagEdit
                tag={tag}
                setThisTag={setThisTag}
                addChildItem={addChildItem}
                addChildTag={addChildTag}
                setShowDesc={setShowDesc}
                cumulatives={cumulatives}
                setCumulatives={setCumulatives}
              />
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default TagInfo;
