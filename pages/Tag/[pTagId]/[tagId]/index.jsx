// React and Next items
import React, { useEffect, useState } from "react";

// Bootstrap items
import { Container, Row, Col } from "react-bootstrap";

// My components
import Layout from "../../../../components/layout";
import TagInfo from "./TagInfo";
import TagList from "../../../../components/TagList";
import ItemList from "../../../../components/ItemList";

// API functions
import { getFullTagData } from "../../../../utils/api/tag";
import { updateTag } from "../../../../utils/api/tag";

// Utility functions
import {
  checkChildTagProperties,
  syncCumulativeValues,
} from "../../../../utils/tags";
import { updateCumulative } from "../../../../utils/api/cumulative";
import { setLatestItems } from "../../../../utils/tagLatestItems";

// Contexts
import { useUser } from "../../../../Contexts/UserContext";

const Tag = ({ thisTag, childTags, childItems, cumulatives }) => {
  const userData = useUser();
  const [stateTag, setStateTag] = useState(thisTag);
  const [stateTags, setStateTags] = useState(childTags);
  const [stateItems, setStateItems] = useState(childItems);
  const [stateCumulatives, setStateCumulatives] = useState(cumulatives);

  const addChildItem = (newItem) => {
    setStateItems([...stateItems, newItem]);
    setLatestItems(stateTag, newItem, stateTag.parent_tag_id);
  };

  const addChildTag = (newTag) => {
    setStateTags([...stateTags, newTag]);
  };

  const handleShowDeleteItem = (status, item) => {
    setShowDeleteItem(status);
  };

  // When the page loads, run code to check the child tag properties
  useEffect(() => {
    checkChildTagProperties(stateTag, stateTags, updateTag);
    syncCumulativeValues(
      stateTag,
      stateTags,
      stateItems,
      cumulatives,
      updateTag,
      updateCumulative
    );
    setLatestItems(stateTag.id, stateItems, stateTag.parent_tag_id);
  }, []);

  useEffect(() => {
    setStateTag(thisTag);
    setStateTags(childTags);
    setStateItems(childItems);
  }, [thisTag, childTags.length, childItems.length]);

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={{ span: 12 }} md={{ span: 10, offset: 1 }}>
            <TagInfo
              tag={stateTag}
              cumulatives={cumulatives}
              userData={userData || {}}
              addChildItem={addChildItem}
              addChildTag={addChildTag}
              setThisTag={setStateTag}
            />

            <Row className="accent-top mt-3">
              <Col className="mt-3">
                {stateTags.length > 0 && <TagList tags={stateTags} />}
              </Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <ItemList items={stateItems} parentTag={stateTag} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { pTagId, tagId } = context.params;
  const response = await getFullTagData(pTagId, tagId);
  const thisTag = await response[0].json();
  const childTags = await response[1].json();
  const childItems = await response[2].json();
  const cumulatives = await response[3].json();
  return {
    props: {
      thisTag,
      childTags: childTags.Items || [],
      childItems: childItems.Items || [],
      cumulatives: cumulatives.Items || [],
    },
  };
}

export default Tag;
