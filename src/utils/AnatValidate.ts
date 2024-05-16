import * as yup from "yup";

// Defina o esquema de validação usando yup
export const anatSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  comments: yup.string(),
  executions: yup.string(),
});
