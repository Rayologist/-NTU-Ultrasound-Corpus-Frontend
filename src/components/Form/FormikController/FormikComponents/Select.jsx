import React from "react";
import { Field } from "formik";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={name} id={name} />
      <Field>
        {({ form, meta }) => {
          return (
            <TextField
              select
              defaultValue=""
              label={label}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              onReset={form.handleReset}
              error={form.touched[name] && !!form.errors[name]}
              helperText={form.touched[name] && form.errors[name]}
              value={meta.value[name]}
              inputProps={{
                name,
                id: name,
              }}
              {...rest}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.key}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.key}
                </MenuItem>
              ))}
            </TextField>
          );
        }}
      </Field>
    </FormControl>
  );
}

export default Select;
