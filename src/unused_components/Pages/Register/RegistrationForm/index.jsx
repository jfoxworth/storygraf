import React from "react";
import { Container, Button } from "react-bootstrap";
import InputWrapper from "../../../shared/Forms/InputWrapper";

const RegistrationForm = ({ disabled }) => {
  return (
    <Container>
      <InputWrapper label={"User Name"} name={"username"} required={true} />
      <InputWrapper label={"email"} name={"email"} required={true} />
      <InputWrapper
        label={"Password"}
        name={"password"}
        type={"password"}
        required={true}
      />
      <InputWrapper
        label={"Repeat Password"}
        name={"repeatPassword"}
        type={"password"}
        required={true}
      />

      <p className="forgot-password text-right">
        Already registered <a href="/login">log in?</a>
      </p>

      {disabled && (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      )}
    </Container>
  );
};

export default RegistrationForm;
