import React from "react";
import { forwardRef } from "react";

const InputMain = (
  {
    label,
    value,
    required,
    onChange,
    name,
    inputType = "input",
    type = "text",
    error,
    options,
    ...inputProps
  },
  ref
) => {
  // console.log("options", options);
  const register = () => {
    return {
      value: value,
      onChange: onChange,
      name: name,
      type: type,
      className: `form__input ${!!error ? "formerror" : ""}`,
      ...inputProps,
    };
  };
  return (
    <>
      <label className="label">
        {label}
        {required && <span> *</span>}
      </label>
      {inputType == "input" ? (
        <input {...register()} ref={ref} />
      ) : inputType == "textarea" ? (
        <textarea {...register()} />
      ) : inputType == "select" ? (
        <>
          <select
            {...register()}
            className={`select form__input ${!!error ? "formerror" : ""}`}
            options={options}
          >
            {options?.length > 0 &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </>
      ) : (
        ""
      )}

      {!!error ? <p className="error">{error}</p> : ""}
    </>
  );
};

const Input = forwardRef(InputMain);

export default Input;
