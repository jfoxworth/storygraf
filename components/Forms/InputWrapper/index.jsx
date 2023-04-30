import React from "react";
import { Field } from "react-final-form";
import styles from "./styles.module.css";

const InputWrapper = ({
  label,
  placeholder = null,
  required = false,
  displayValue = "",
  name,
  type = "text",
  ...otherProps
}) => {
  const showLabel = required ? label + "*" : label;

  return (
    <div className={styles.FieldWrapper}>
      <Field name={name}>
        {({ input, meta }) => {
          const isError =
            (meta.touched && meta.invalid) || (meta.touched && meta.error);

          return (
            <>
              <div className={styles.InputLabel}>
                {label && <span>{showLabel}</span>}
              </div>
              <input
                className={styles.InputClass}
                {...input}
                type={type}
                placeholder={placeholder}
              />

              {isError && <div className={styles.ErrorBox}>{meta.error}</div>}
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default InputWrapper;
