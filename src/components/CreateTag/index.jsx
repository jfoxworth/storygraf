import React from "react";
import FormInput from "../shared/Forms/FormInput";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { CreateTag } from "../../graphql/mutations";

const CreateNewTag = () => (
  <>
    <h3 className={"text-center mt-5 mb-5"}>Create a Tag</h3>
    <Container>
      <Row>
        <Col xs={3}></Col>
        <Col xs={6}>
          <Row>
            <Col xs={11}>
              <FormInput
                className="mt-5"
                type="text"
                name="tagname"
                icon="Cube"
                placeholder="Enter Name Here"
                label="Name and color for tag"
                handleChange={() => {}}
                error={true}
              />
            </Col>

            <Col xs={1} className={"mt-4"}>
              <Form.Control
                type="color"
                id="tagcolor"
                defaultValue="#563d7c"
                title="Choose your color"
              />
            </Col>
          </Row>
          <Row className={"mt-3"}>
            <Col xs="4"></Col>
            <Col xs="4">
              <Button className="w-100" variant="primary">
                Create New Tag
              </Button>
            </Col>
            <Col xs="4"></Col>
          </Row>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  </>
);

export default CreateNewTag;
