"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormField from "./FormField";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

function RegisterForm() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/homepage");
  }

  const handleSubmit = async (values, onSubmitProps) => {
    signIn("credentials", values);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={schema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <FormField name="email" type="email" placeholder="Email" />
              <FormField
                name="password"
                type="password"
                placeholder="Password"
              />
              <button
                onClick={() => handleSubmit()}
                className="w-full mt-3 text-white bg-sky-400 text-xl p-3 rounded hover:bg-sky-500 transition duration-500"
              >
                LOG IN
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
//
export default RegisterForm;
