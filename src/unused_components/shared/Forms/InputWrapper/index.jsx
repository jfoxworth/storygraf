import React from "react";
import { Field } from "react-final-form";
import styled from "styled-components";

const InputWrapper = ({
  label,
  placeholder = null,
  required,
  displayValue = "",
  name,
  type = "text",
  ...otherProps
}) => {
  const showLabel = required ? label + "*" : label;

  return (
    <FieldWrapper>
      <Field name={name}>
        {({ input, meta }) => {
          const isError = meta.touched && meta.invalid;

          return (
            <>
              <InputLabel>{label && <span>{showLabel}</span>}</InputLabel>
              <InputClass
                className={InputClass}
                {...input}
                type={type}
                placeholder={placeholder}
              />

              {isError && <ErrorBox>{meta.error}</ErrorBox>}
            </>
          );
        }}
      </Field>
    </FieldWrapper>
  );
};

const FieldWrapper = styled.div`
  display: block;
  margin: 1em auto;
`;

const InputLabel = styled.div`
  display: block;
  margin: 0.2em auto;
  font-color: #808080;
`;

const InputClass = styled.input`
  border: 1px solid #bcbcbc;
  border-radius: 5px;
  width: 100%;
  padding: 8px 8px;
`;

const ErrorBox = styled.div`
  display: block;
  margin: 0.2em 0.2em;
  color: red;
  font-size: 0.7em;
`;

export default InputWrapper;
