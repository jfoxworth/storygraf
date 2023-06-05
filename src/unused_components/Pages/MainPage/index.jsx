import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CognitoUserPool from "../../shared/CognitoPool";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

const MainPage = () => {
  const getPageGraf = async () => {
    /*
    await API.graphql({
      query: getTag,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => {
      let tagData = data.data.getTag;
      console.log("The tag data in the tag page is");
      console.log(tagData);
      tagData.data = JSON.parse(tagData.data);
      setThisTag(tagData);
    });
*/
  };

  useEffect(() => {
    getPageGraf();
    console.log(CognitoUserPool);
    var attributeList = [];
    var dataEmail = {
      Name: "email",
      Value: "email@mydomain.com",
    };
    console.log("here 1");
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
      dataEmail
    );
    console.log("here 2");
    attributeList.push(attributeEmail);

    console.log("here 3");
    CognitoUserPool.signUp(
      "username",
      "123asdASD>?",
      attributeList,
      function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        var cognitoUser = result.user;
        console.log("user name is " + cognitoUser.getUsername());
      }
    );
    console.log("here 4");
  }, []);

  return (
    <Container>
      <Row className={"mt-5"}>
        <Col
          xs={{ span: 10, offset: 1, order: 2 }}
          md={{ span: 3, offset: 1, order: 1 }}
        >
          <p>Left Column</p>
        </Col>

        <Col
          xs={{ span: 10, offset: 0, order: 1 }}
          md={{ span: 3, offset: 0, order: 2 }}
        >
          <p>Middle Column</p>
        </Col>

        <Col
          xs={{ span: 10, offset: 0, order: 3 }}
          md={{ span: 3, offset: 0, order: 3 }}
        >
          <p>Right Column</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
