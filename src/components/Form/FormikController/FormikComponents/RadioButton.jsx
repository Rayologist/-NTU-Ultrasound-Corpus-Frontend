import React from "react";
import { Field} from "formik";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function RadioButton(props) {
  const { label, name, options, ...rest } = props;

  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend" htmlFor={name}>
        {label}
      </FormLabel>
      <Field name={name} {...rest}>
        {({ form }) => {
          return (
            <RadioGroup
              aria-label={label}
              name={name}
              value={form.values[name]}
              onChange={form.handleChange}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.key}
                  value={option.value}
                  control={<Radio />}
                  label={option.key}
                  htmlFor={option.value}
                />
              ))}
            </RadioGroup>
          );
        }}
      </Field>
    </FormControl>
  );
}

export default RadioButton;
