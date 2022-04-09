import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./helper/TextError";

function Checkbox(props) {
  const { label, name, options, ...rest } = props;

  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) =>
          options.map((option) => (
            <React.Fragment key={option.key}>
              <input
                type="checkbox"
                id={option.key}
                value={option.value}
                checked={field.value.includes(option.value)}
                {...field}
              />
              <label htmlFor={option.key}>{option.value}</label>
            </React.Fragment>
          ))
        }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Checkbox;
