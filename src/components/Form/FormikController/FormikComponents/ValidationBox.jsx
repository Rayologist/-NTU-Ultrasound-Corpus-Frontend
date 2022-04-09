import React from "react";
import {
  FormControl,
  TextField,
  Grid,
  FormGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Field } from "formik";

function ValidationBox(props) {
  const { label, name, length } = props;
  const refs = Array.from(Array(length), (value) => React.createRef());
  return (
    <>
      <FormControl component="fieldset" hiddenLabel>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup row>
          <Grid container spacing={2}>
            {Object.keys(refs).map((index) => {
              index = Number(index);
              return (
                <Field name={name} key={index}>
                  {({ form, field }) => {
                    return (
                      <Grid item xs={1} md={1}>
                        <FormControlLabel
                          control={
                            <>
                              <TextField
                                name={`${index}`}
                                inputRef={refs[index]}
                                onFocus={(e) => {
                                  e.target.select();
                                }}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "Backspace" &&
                                    e.target.value === ""
                                  ) {
                                    refs[index - 1]?.current.focus();
                                  }
                                  if (e.key === "ArrowLeft") {
                                    e.preventDefault();
                                    refs[index - 1]?.current.focus();
                                  }
                                  if (e.key === "ArrowRight") {
                                    e.preventDefault();
                                    refs[index + 1]?.current.focus();
                                  }
                                }}
                                onInput={(e) => {
                                  const isNumber = /[0-9]/.test(e.target.value);
                                  if (!isNumber) {
                                    e.target.value = "";
                                  }

                                  form.setFieldValue(name, {
                                    ...field.value,
                                    [index]: e.target.value,
                                  });

                                  if (isNumber) {
                                    refs[index + 1]?.current.focus();
                                  }
                                }}
                                onChange={(e) => {
                                  // form.handleChange(e);
                                }}
                                onBlur={field.onBlur}
                                value={field.value[index]}
                                inputProps={{
                                  maxLength: 1,
                                  autoCorrect: "off",
                                  autoComplete: "off",
                                  autoCapitalize: "off",
                                  type: "tel",
                                  style: { textAlign: "center" },
                                }}
                              />
                            </>
                          }
                          label=""
                        />
                      </Grid>
                    );
                  }}
                </Field>
              );
            })}
          </Grid>
        </FormGroup>
      </FormControl>
    </>
  );
}

export default ValidationBox;
