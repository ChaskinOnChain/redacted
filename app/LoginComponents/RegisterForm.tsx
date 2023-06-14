import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormField from "./FormField";
import axios from "axios";
import ImageUploadButton from "./ImageUploadButton";

const schema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

interface Props {
  toggle: () => void;
}

function RegisterForm({ toggle }: Props) {
  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.post("/api/auth/register", values);
      if (res.status === 201) {
        onSubmitProps.resetForm();
        toggle();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <FormField name="firstName" type="text" placeholder="First Name" />
            <FormField name="lastName" type="text" placeholder="Last Name" />
            <FormField name="location" type="text" placeholder="Location" />
            <FormField name="occupation" type="text" placeholder="Occupation" />
            Upload Profile Picture
            <ImageUploadButton />
            <FormField name="email" type="email" placeholder="Email" />
            <FormField name="password" type="password" placeholder="Password" />
            <button
              onClick={() => handleSubmit()}
              className="w-full mt-3 text-white bg-sky-400 text-xl p-3 rounded hover:bg-sky-500 transition duration-500"
            >
              REGISTER
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
