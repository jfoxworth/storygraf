// Standard React Items
import React from "react";
import { Form } from "react-bootstrap";

const FormDropdown = ({
  handleChange,
  options,
  label,
  placeholder = "",
  error = false,
  errorMessage = "",
  id = "",
  value = "",
}) => {
  return (
    <div className="field has-flex-label has-validation text-muted small">
      <label>
        {label ? <span>{label}</span> : null}
        {error ? <span className="error">{errorMessage}</span> : null}
      </label>
      <Form.Select aria-label={label} onChange={handleChange} value={value}>
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
