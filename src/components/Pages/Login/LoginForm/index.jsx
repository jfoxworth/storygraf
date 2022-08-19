import React from "react";
import { Container, Button } from "react-bootstrap";
import InputWrapper from "../../../shared/Forms/InputWrapper";

const LoginForm = () => {
  return (
    <Container>
      <InputWrapper label={"User Name"} name={"username"} required={true} />
      <InputWrapper
        label={"Password"}
        name={"password"}
        type={"password"}
        required={true}
      />

      <Button variant="primary" type="submit">
        Login
      </Button>
      <p className="forgot-password text-right">
        Not a user? <a href="/register">Create an Account</a>
      </p>
    </Container>
  );
};

export default LoginForm;
