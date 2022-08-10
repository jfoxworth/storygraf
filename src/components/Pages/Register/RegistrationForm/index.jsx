import React, { useState } from "react";
import styled from "styled-components";
import { Container, Form, Button } from "react-bootstrap";
import { signUpUser } from "../../../shared/utils/cognito";
import InputWrapper from "../../../shared/Forms/InputWrapper";

const RegistrationForm = ({ disabled }) => {
  return (
    <Container>
      <Form>
        <InputWrapper label={"User Name"} name={"username"} required={true} />
        <InputWrapper label={"email"} name={"email"} required={true} />
        <InputWrapper label={"Password"} name={"password"} required={true} />
        <InputWrapper
          label={"Repeat Password"}
          name={"repeatPassword"}
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
      </Form>
    </Container>
  );
};

export default RegistrationForm;
