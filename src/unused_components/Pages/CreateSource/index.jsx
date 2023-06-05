import React, { useState } from "react";
import FormInput from "../../shared/Forms/FormInput";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const CreateSource = () => {
  let userData = "";
  /*
  Auth.currentAuthenticatedUser({ bypassCache: true }).then(
    (data) => (userData = data)
  );
  */
  let [sourceName, setSourceName] = useState("");
  const handleChangeSourceName = (event) => {
    setSourceName(event.target.value);
  };

  let [sourceURL, setSourceURL] = useState("");
  const handleChangeSourceURL = (event) => {
    setSourceURL(event.target.value);
  };

  let [sourceImage, setSourceImage] = useState("");
  const handleSetSourceImage = (event) => {
    setSourceImage(event.target.value);
  };

  let [sourceDescription, setSourceDescription] = useState("");
  const handleChangeSourceDescription = (event) => {
    setSourceDescription(event.target.value);
  };

  const handleAddSource = async (event) => {
    event.preventDefault();
    fetch("http://localhost:3080/api/source", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Item: {
          data: {
            sourceName: sourceName,
            creatorId: userData?.username,
            creatorEmail: userData?.attributes?.email,
            sourceUrl: sourceURL,
            sourceImage: sourceImage,
            description: sourceDescription,
          },
        },
      }),
    }).then((response) => {
      console.log(response.data);
    });

    setSourceName("");
    setSourceURL("");
    setSourceImage("");
    setSourceDescription("");
  };

  return (
    <>
      <Container>
        <form onSubmit={handleAddSource}>
          <Row className="mt-5"></Row>
          <h3 className={"text-center mt-5 mb-5"}>Create a Source</h3>
          <Row>
            <Col xs={3}></Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <FormInput
                    className="mt-5"
                    type="text"
                    name="sourceName"
                    icon="Cube"
                    placeholder="Enter source name"
                    label="Name of the source"
                    value={sourceName}
                    handleChange={handleChangeSourceName}
                  />
                </Col>

                <Col xs={12}>
                  <FormInput
                    className="mt-5"
                    type="text"
                    name="sourceURL"
                    icon="Cube"
                    placeholder="Enter source URL"
                    label="URL of the source"
                    value={sourceURL}
                    handleChange={handleChangeSourceURL}
                  />
                </Col>

                <Col xs={12}>
                  <FormInput
                    className="mt-5"
                    type="text"
                    name="sourceImageURL"
                    icon="Cube"
                    placeholder="Enter source image URL"
                    label="URL of image source"
                    value={sourceImage}
                    handleChange={handleSetSourceImage}
                  />
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="sourceDesc">
                    <Form.Label>Description of Source</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={handleChangeSourceDescription}
                    />
                  </Form.Group>{" "}
                </Col>
              </Row>
              <Row className={"mt-3"}>
                <Col xs="4"></Col>
                <Col xs="4">
                  <Button
                    className="w-100"
                    variant="primary"
                    onClick={handleAddSource}
                  >
                    Create New Source
                  </Button>
                </Col>
                <Col xs="4"></Col>
              </Row>
            </Col>
            <Col xs={3}></Col>
          </Row>
        </form>
      </Container>
    </>
  );
};

export default CreateSource;
