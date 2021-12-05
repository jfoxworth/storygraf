import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import { listSources } from "../../graphql/queries";
import Source from "../Source";

const ListSources = () => {
  let userData = "";
  let [sourceData, setSourceData] = useState([]);
  Auth.currentAuthenticatedUser({ bypassCache: true }).then(
    (data) => (userData = data)
  );

  const getSources = async () => {
    const input = {};
    let sourcePromise = await API.graphql({
      query: listSources,
      variables: { input: input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }).then((data) => setSourceData(data.data.listSources.items));
  };

  useEffect(() => {
    getSources();
  }, []);

  return (
    <>
      <Container>
        <form onSubmit={() => {}}>
          <Row className="mt-5"></Row>
          <h3 className={"text-center mt-5 mb-5"}>Available Sources</h3>
          <h6 className={"text-center"}>
            These are sources that are approved for use within grafs
          </h6>

          {sourceData.map((source, index) => (
            <Source source={source} key={`${index}`} />
          ))}
        </form>
      </Container>
    </>
  );
};

export default ListSources;
