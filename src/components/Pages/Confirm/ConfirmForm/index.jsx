import React from "react";
import { Container, Button } from "react-bootstrap";
import InputWrapper from "../../../shared/Forms/InputWrapper";

const ConfirmForm = ({ username }) => {
  return (
    <Container>
      <InputWrapper
        label={"User Name"}
        name={"username"}
        defaultValue={username}
        required={true}
      />
      <InputWrapper
        label={"Confirmation Code"}
        name={"confirm"}
        required={true}
      />

      <Button variant="primary" type="submit">
        Confirm
      </Button>
    </Container>
  );
};

export default ConfirmForm;
