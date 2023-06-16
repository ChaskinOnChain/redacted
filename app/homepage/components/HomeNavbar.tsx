"use client";

import DarkLight from "@/app/LoginComponents/DarkLight";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";
import NavLogo from "./NavLogo";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const initialValues = {
  search: "",
};

const schema = yup.object().shape({
  search: yup.string().required("required"),
});

function HomeNavbar() {
  const queryClient = useQueryClient();
  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.get(`/api/posts?search=${values}`);
      if (res.status === 201) {
        onSubmitProps.resetForm();
        queryClient.invalidateQueries(["posts"]);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return (
    <>
      <nav className="w-full h-16 flex justify-between items-center px-12 max-w-[1466px] mx-auto">
        <div className="relative flex items-center justify-between gap-3">
          <NavLogo />
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="w-full">
                  <Field
                    name="search"
                    placeholder="Search..."
                    type="text"
                    className="bg-slate-200 rounded px-4 py-1 text-base"
                  />
                  <FontAwesomeIcon className="-ml-8" icon={faMagnifyingGlass} />
                  <button type="submit" style={{ display: "none" }}></button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="relative flex items-center justify-between gap-4">
          <DarkLight />
          <FontAwesomeIcon icon={faMessage} />
          <Logout />
        </div>
      </nav>

      <div className="h-1 w-full bg-slate-200"></div>
    </>
  );
}

export default HomeNavbar;
