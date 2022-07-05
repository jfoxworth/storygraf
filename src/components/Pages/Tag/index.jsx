import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useParams } from "react-router-dom";
import { getTag } from "../../../graphql/queries";
import { API } from "aws-amplify";
import Tag from "../../shared/Tag";
import TagInfo from "./TagInfo";
import TagChildren from "../../shared/TagChildren";
import TagArticles from "../../shared/TagArticles";

const TagPage = (props) => {
  const [userData, setUserData] = useState({});
  const [thisTag, setThisTag] = useState({});
  const [numChildren, setNumChildren] = useState(0);
  const [numArticles, setNumArticles] = useState(0);
  const [cumulatives, setCumulatives] = useState([]);
  const params = useParams();

  const getThisTag = async (id) => {
    await API.graphql({
      query: getTag,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      let tagData = data.data.getTag;
      tagData.data = JSON.parse(tagData.data);
      setThisTag(tagData);
    });
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then((data) => {
      setUserData(data);
    });
    getThisTag(params.tagId);
  }, [params.tagId]);

  return (
    <>
      {!!thisTag.id && <Spinner animation="border" variant="primary" />}
      {thisTag.id && (
        <Container>
          <Row className={"mt-12"}>
            <Col xs={{ span: 12 }} md={{ span: 10, offset: 1 }}>
              <Row className="mt-5 accent-bottom">
                <Col xs={{ span: 8 }} md={{ span: 8 }}>
                  <Tag
                    tag={thisTag}
                    handleCreateTagClick={() => {}}
                    handleCreateArticleClick={() => {}}
                    showAdds={false}
                  />
                </Col>
                <Col xs={{ span: 4 }} md={{ span: 4 }}>
                  <div className={"text-right w-full"}>
                    {userData?.attributes?.email}
                  </div>
                </Col>
              </Row>

              <TagInfo
                tag={thisTag}
                userData={userData}
                numArticles={numArticles}
                numChildren={numChildren}
                cumulatives={cumulatives}
              />

              <Row className="mt-5">
                <Col>
                  <h2 className="accent-bottom mb-3 pb-3"></h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  {thisTag && (
                    <>
                      <TagChildren
                        tag={thisTag}
                        setNumChildren={setNumChildren}
                      />
                      <TagArticles
                        tag={thisTag}
                        setNumArticles={setNumArticles}
                        showEdits={true}
                        cumulatives={thisTag.data.cumulatives}
                        setCumulatives={setCumulatives}
                      />
                    </>
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
