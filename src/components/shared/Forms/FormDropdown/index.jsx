/*
 *
 *   Copyright Mak Studio - 2021
 *
 *   Mak Studio is a Houston based supplier of custom furniture and appliances.
 *   This app lets users design their own pieces and start the purchase process.
 *
 *   You can reach Mak Studio at www.makstudio.us
 *
 *
 *   This is the primary component used for inputs within the app.
 *   It takes in a handleChange function and other items that may
 *   be needed for the input.
 *
 */

// Standard React Items
import React, { FC, ReactElement } from "react";
import { Form } from "react-bootstrap";

const FormDropdown = ({
  handleChange,
  options,
  label,
  placeholder = "",
  error = false,
  errorMessage = "",
  id = "",
}) => {
  return (
    <div className="field has-flex-label has-validation">
      <label>
        {label ? <span>{label}</span> : null}
        {error ? <span className="error">{errorMessage}</span> : null}
      </label>
      <Form.Select aria-label={label} onChange={handleChange}>
        <option>{placeholder}</option>
        {options.map((option, index) => (
          <option value={option.value} key={`dropdown${index}`}>
            {option.label}
          </option>
        ))}
      </Form.Select>{" "}
    </div>
  );
};

export default FormDropdown;
