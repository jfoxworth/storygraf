import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { signUpUser } from "../../shared/utils/cognito";
import { Form } from "react-final-form";
import RegistrationForm from "./RegistrationForm";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disableButton, setDisabled] = useState(true);

  const onFormSubmit = (e) => {
    signUpUser(username, email, password);
  };

  const validate = (values) => {
    setUsername(values.username);
    setEmail(values.email);
    setPassword(values.password);
    setRepeatPassword(values.repeatPassword);
    const errors = {};
    if (!values?.username) {
      errors.username = "A user name is required";
    }
    if (values?.username?.length > 50) {
      errors.username = "Character limit of 50 for a username";
    }
    if (!values?.email) {
      errors.email = "An email is required";
    }
    if (!values?.password) {
      errors.password = "A password is required";
    }
    if (!values?.repeatPassword) {
      errors.repeatPassword = "The password must be entered twice";
    }
    if (values?.password !== values?.repeatPassword) {
      errors.repeatPassword =
        "The first password must match the second password";
    }

    setDisabled(
      !errors.username &&
        !errors.email &&
        !errors.password &&
        !errors.repeatPassword
    );

    return errors;
  };

  return (
    <Container>
      <RegisterContainer>
        <h1 className="mb-4">Register</h1>
        <Form
          onSubmit={onFormSubmit}
          validate={validate}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <RegistrationForm disabled={disableButton} />
              </form>
            );
          }}
        />
      </RegisterContainer>
    </Container>
  );
};

const RegisterContainer = styled.div`
  max-width: 500px;
  margin: 10em auto;
`;

export default RegisterPage;
