/*
 
     This page displays a "tag" in storygraf. This component fetches all 
     items with a primary key of "PTAG<PTAGID>". This will be the data 
     for the tag in question, all direct child tags, and all direct article
     children as well as any embedded tags, imported tags, or accumulated 
     items. It then calls children components to display the information.
     
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TagInfo from "./TagInfo";
import TagChildren from "./TagChildren";
import { useUser } from "../../Contexts/UserContext";
import {
  getTagChildren,
  getTagInfo,
  updateTag,
} from "../../shared/utils/api/tag";

const TagPage = () => {
  const [thisTag, setThisTag] = useState({});
  const [childData, setChildData] = useState([]);
  const params = useParams();
  const userData = useUser();

  const calculateCumulatives = () => {
    let tempCumulatives = [];
    thisTag?.data?.cumulatives?.forEach((thisCum) => {
      tempCumulatives.push({ ...thisCum, value: 0 });
    });
    tempCumulatives.forEach((thisCum, ci) => {
      childData.forEach((thisChild) => {
        thisChild.data?.cumulatives?.forEach((thisChildCum) => {
          if (thisCum.text === thisChildCum.text) {
            tempCumulatives[ci].value =
              parseFloat(tempCumulatives[ci].value) +
              parseFloat(thisChildCum.value);
          }
        });
      });
    });
    checkCumulativeValues(tempCumulatives, thisTag);
    setThisTag({
      ...thisTag,
      data: { ...thisTag.data, cumulatives: tempCumulatives },
    });
  };

  const checkCumulativeValues = (tempCumulatives, tag) => {
    let testFlag = false;
    tempCumulatives.forEach((tempCum, ci) => {
      tag.data?.cumulatives?.forEach((tagCum) => {
        if (tempCum.text === tagCum.text) {
          if (tempCum.value !== tagCum.value) {
            testFlag = true;
          }
        }
      });
    });
    if (testFlag) {
      updateTag({
        ...tag,
        data: { ...tag.data, cumulatives: tempCumulatives },
      });
    }
  };

  const addChildItem = (newItem) => {
    setChildData([...childData, newItem]);
  };

  useEffect(() => {
    getTagInfo(params.pTagId, params.tagId).then((data) =>
      setThisTag(JSON.parse(data))
    );
    getTagChildren(params.tagId).then((data) =>
      setChildData(JSON.parse(data).Items)
    );
  }, [params.pTagId, params.tagId]);

  useEffect(() => {
    calculateCumulatives();
  }, [childData]);

  return (
    <>
      {!!thisTag.id && <Spinner animation="border" variant="primary" />}
      {thisTag.id && (
        <Container>
          <Row className={"mt-5"}>
            <Col xs={{ span: 12 }} md={{ span: 10, offset: 1 }}>
              <TagInfo
                tag={thisTag}
                userData={userData || {}}
                addChildItem={addChildItem}
              />

              <Row className="accent-top">
                <Col className="mt-3">
                  {childData.length > 0 && (
                    <TagChildren childData={childData} tag={thisTag} />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default TagPage;
