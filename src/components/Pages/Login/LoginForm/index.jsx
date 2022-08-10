import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import InputWrapper from "../../../shared/Forms/InputWrapper";

const LoginForm = () => {
  return (
    <Container>
      <Form>
        <InputWrapper label={"User Name"} name={"username"} required={true} />
        <InputWrapper label={"Password"} name={"password"} required={true} />

        <Button variant="primary" type="submit">
          Login
        </Button>
        <p className="forgot-password text-right">
          Not a user? <a href="/register">Create an Account</a>
        </p>
      </Form>
    </Container>
  );
};

export default LoginForm;
