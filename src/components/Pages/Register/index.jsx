/*
    This is the main registration page for storygraf. AWS Cognito is used to 
    house users and for validation. A profile containing everything but the 
    email and password is stored on storygrafs dynammoDB database.

    When a user enters a username, we check dynammoDB to see if that user name
    already exists. If it does, a warning is shown.

    The code checks the format of the email, ensures that the password has
    all the necessary elements, and that the repeat matches. If the username
    is unclaimed, the email is formatted properly, and the password fits, the
    button is shown to register.

    Once the user registers, they are sent an email to validate by clicking on 
    a link. This is all AWS Cognito.

*/

import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Container, Alert } from "react-bootstrap";
import { signUpUser } from "../../shared/utils/cognito";
import { Form } from "react-final-form";
import RegistrationForm from "./RegistrationForm";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disableButton, setDisabled] = useState(true);
  const [formStatus, setFormStatus] = useState(false);

  const onFormSubmit = (e) => {
    signUpUser(username, email, password);
    setFormStatus(true);
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 2000);
    };
  };

  const callDBCheck = (newUsername) => {
    fetch("http://localhost:3080/api/testuser/" + newUsername, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => setUsernameExists(JSON.parse(data).Count > 0));
  };

  const optimizedFn = useCallback(debounce(callDBCheck), []);

  const validate = (values) => {
    if (values?.username !== username) {
      setUsername(values?.username);
      optimizedFn(values?.username);
    }
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
    if (usernameExists) {
      errors.username = "That user name is already taken";
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
    if (
      !/[0-9]/.test(values?.password) ||
      !/[A-Z]/.test(values?.password) ||
      !/[a-z]/.test(values?.password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(values?.password)
    ) {
      errors.password =
        "The password must contain a lowercase letter, uppercase letter, a number, and one special character";
      errors.repeatPassword =
        "The password must contain a lowercase letter, uppercase letter, a number, and one special character";
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
              <>
                <form onSubmit={handleSubmit}>
                  <RegistrationForm disabled={disableButton} />
                </form>
                {formStatus && (
                  <Alert variant={"success"} className={"mt-5"}>
                    Check your email for a confirmation link!!!
                  </Alert>
                )}
              </>
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
