/*

  This should be replaced with the InputWrapper
*/

// Standard React Items
import React from "react";

// Components
import FaIcon from "../../FaIcon";

// Bootstrap Items
import { InputGroup, FormControl } from "react-bootstrap";

const FormInput = ({
  handleChange = () => {},
  value = "",
  label,
  placeholder = "",
  type = "text",
  name = "",
  error = false,
  errorMessage = "",
  icon = "",
  id = "",
}) => {
  return (
    <div className="field has-flex-label has-validation text-muted small">
      <label>
        {label ? <span>{label}</span> : null}
        {error ? <span className="error">{errorMessage}</span> : null}
      </label>
      <InputGroup className="mb-3">
        {icon && (
          <InputGroup.Text id="basic-addon1">
            <div className="form-icon">
              <FaIcon icon={icon} />
            </div>
          </InputGroup.Text>
        )}
        <FormControl
          name={name}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          id={id}
          aria-describedby="basic-addon1"
        />
      </InputGroup>{" "}
    </div>
  );
};

export default FormInput;
