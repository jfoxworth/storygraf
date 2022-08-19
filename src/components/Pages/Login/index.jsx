import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Form } from "react-final-form";
import { loginUser } from "../../shared/utils/cognito";

const LoginPage = () => {
  const LoginContainer = styled.div`
    max-width: 500px;
    margin: 10em auto;
  `;

  const onFormSubmit = async (values) => {
    loginUser(values.username, values.password);
  };

  return (
    <Container>
      <LoginContainer>
        <h1 className="mb-4">Login</h1>
        <Form
          onSubmit={onFormSubmit}
          render={({ handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <LoginForm />
              </form>
            );
          }}
        />
      </LoginContainer>
    </Container>
  );
};

export default LoginPage;
