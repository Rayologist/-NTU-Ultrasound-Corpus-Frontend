import React from "react";
import Input from "./FormikComponents/Input";
import Checkbox from "./FormikComponents/Checkbox";
import RadioButton from "./FormikComponents/RadioButton";
import Textarea from "./FormikComponents/Textarea";
import Select from "./FormikComponents/Select";
import ValidationBox from "./FormikComponents/ValidationBox";

function FormikController(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "radio":
      return <RadioButton {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    case "validationbox":
      return <ValidationBox {...rest} />;
    default:
      return null;
  }
}

export default FormikController;
