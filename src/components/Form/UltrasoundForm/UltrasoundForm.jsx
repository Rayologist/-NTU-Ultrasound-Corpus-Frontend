import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import FormikController from "../FormikController/FormikController";
import getImage from "../../../services/getImageServices";
import { useFormikContext } from "formik";
import {
  consonantMandarinOptions,
  consonantSquliqOptions,
  vowelSquliqOptions,
  vowelMandarinOptions,
  languageOptions,
  typeOptions,
} from "./Options";
import { Typography, Grid } from "@mui/material";
import * as yup from "yup";

const Submit = () => {
  const formik = useFormikContext();
  const { errors, dirty, touched, submitForm, values, setFieldValue } = formik;
  useEffect(() => {
    if (values.type === "consonant") {
      setFieldValue("vowel", "");
    } else if (values.type === "vowel") {
      setFieldValue("consonant", "");
    }

    if (
      JSON.stringify(touched) !== "{}" &&
      dirty &&
      JSON.stringify(errors) === "{}"
    ) {
      if (values[values.type] !== "") {
        submitForm();
      }
    }
  }, [values]);

  return null;
};

function UltrasoundForm(props) {
  const { setUltrasound, setIsFetching } = props;
  const initialValues = {
    language: "",
    type: "",
    vowel: "",
    consonant: "",
  };
  const validationSchema = yup.object().shape({
    language: yup.string().required("必填"),
    type: yup.string().required("必填"),
    vowel: yup.string(),
    consonant: yup.string(),
  });

  const handleOnSubmit = (values) => {
    async function fetchImage() {
      setIsFetching(true);
      const res = await getImage(values);
      setUltrasound(res);
      setIsFetching(false);
    }
    fetchImage();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Typography
                variant="h4"
                mt={2}
                mb={5}
                component="div"
                textAlign="center"
              >
                NTU Ultrasound Corpus
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormikController
                    control="select"
                    name="language"
                    label="Language"
                    options={languageOptions}
                    onChange={(e) => {
                      formik.setFieldValue("vowel", "");
                      formik.setFieldValue("consonant", "");
                      formik.handleChange(e);
                    }}
                    />
                </Grid>

                {formik.values.language !== "" ? (
                  <Grid item xs={12} md={12}>
                    <FormikController
                      control="radio"
                      name="type"
                      label="Type"
                      options={typeOptions}
                    />
                  </Grid>
                ) : null}

                {formik.values.type === "vowel" &&
                formik.values.language !== "" ? (
                  <Grid item xs={12} md={12}>
                    <FormikController
                      control="select"
                      name="vowel"
                      label="Vowel"
                      options={
                        formik.values.language === "squliq-atayal"
                          ? vowelSquliqOptions
                          : vowelMandarinOptions
                      }
                    />
                  </Grid>
                ) : null}

                {formik.values.type === "consonant" &&
                formik.values.language !== "" ? (
                  <Grid item xs={12} md={12}>
                    <FormikController
                      control="select"
                      name="consonant"
                      label="Consonant"
                      options={
                        formik.values.language === "squliq-atayal"
                          ? consonantSquliqOptions
                          : consonantMandarinOptions
                      }
                    />
                  </Grid>
                ) : null}
              </Grid>
              <Submit />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default UltrasoundForm;
