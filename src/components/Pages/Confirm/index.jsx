import React, { useState } from "react";
import styled from "styled-components";
import ConfirmForm from "./ConfirmForm";
import { Container } from "react-bootstrap";
import { Form } from "react-final-form";
import { confirmUser } from "../../shared/utils/cognito";
import { useParams } from "react-router-dom";

const ConfirmPage = () => {
  const params = useParams();
  const [username, setUsername] = useState(params.username);
  const [confirm, setConfirm] = useState("");

  const onFormSubmit = (values) => {
    console.log(values);
    confirmUser(values.username, values.confirm);
  };

  const validate = (values) => {
    setUsername(values.username);
    setConfirm(values.confirm);
    console.log(values);
    const errors = {};
    if (!values?.username) {
      errors.username = "A user name is required";
    }
    if (!values?.confirm) {
      errors.confirm = "A confirmation code is required";
    }

    return errors;
  };

  return (
    <Container>
      <ConfirmContainer>
        <h1 className="mb-4">Confirm User</h1>
        <Form
          onSubmit={onFormSubmit}
          validate={validate}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <ConfirmForm username={username} />
              </form>
            );
          }}
        />
      </ConfirmContainer>
    </Container>
  );
};

const ConfirmContainer = styled.div`
  max-width: 500px;
  margin: 10em auto;
`;

export default ConfirmPage;
