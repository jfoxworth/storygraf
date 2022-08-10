/*
  This is a wrapper for an input element that will be used throughout the site.
  It is designed to be used as part of a React Final Form form. The component 
  will house the label, error / helper message, and other items that are 
  related to the input.
*/

import React from "react";
import { Field } from "react-final-form";
import { Form, InputGroup, FormControl } from "react-bootstrap";

const InputWrapper = ({
  label,
  placeholder = null,
  required,
  name,
  ...otherProps
}) => {
  const showLabel = required ? label + "*" : label;

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Field name={name}>
            {({ input, meta }) => {
              const isError = meta.touched && meta.invalid;

              return (
                <>
                  <Form.Label>{label && <span>{showLabel}</span>}</Form.Label>
                  <Form.Control
                    {...input}
                    type="text"
                    placeholder={placeholder}
                  />
                  {isError && (
                    <Form.Text className="text-danger">{meta.error}</Form.Text>
                  )}
                </>
              );
            }}
          </Field>
        </Form.Group>
      </Form>
    </div>
  );
};
export default InputWrapper;
