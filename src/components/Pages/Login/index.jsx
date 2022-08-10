import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import { Form } from "react-final-form";

const LoginPage = () => {
  const LoginContainer = styled.div`
    max-width: 500px;
    margin: 10em auto;
  `;

  const onFormSubmit = (e) => {
    console.log("Form submitting");
    /*
    e.preventDefault();
    signUpUser(username, email, password);
    */
  };

  return (
    <Container>
      <LoginContainer>
        <h1 className="mb-4">Login</h1>
        <Form
          onSubmit={onFormSubmit}
          render={({ onFormSubmit }) => {
            return (
              <form onSubmit={onFormSubmit}>
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
