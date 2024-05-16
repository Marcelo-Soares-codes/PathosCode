import * as yup from "yup";

// Defina o esquema de validação usando yup
export const sampleSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  shipping: yup.string(),
  anatId: yup.string().required("Anat is required"),
});
