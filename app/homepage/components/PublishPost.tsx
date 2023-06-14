import { getUserByEmail } from "@/utils/api/apiUtils";
import { useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import FormField from "@/app/LoginComponents/FormField";
import ImageUploadButton from "@/app/LoginComponents/ImageUploadButton";
import axios from "axios";

interface Props {
  email: string;
}

const schema = yup.object().shape({
  text: yup.string().required("required"),
  picture: yup.string(),
  email: yup.string().required("required"),
});

const initialValues = {
  text: "",
  picture: "",
  email: "",
};

function PublishPost({ email }: Props) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["user", email],
    queryFn: () => email && getUserByEmail(email),
    enabled: !!email,
  });

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.post("/api/posts", values);
      if (res.status === 201) {
        onSubmitProps.resetForm();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  const initialValues = {
    text: "",
    picture: "",
    email,
  };

  return (
    <div className="border-4 p-4 w-[400px] rounded-md">
      {isLoading && <p> Loading...</p>}
      {data && (
        <div className="flex items-center">
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={schema}
          >
            {({ values, setFieldValue }) => (
              <Form className="w-full">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 relative">
                    <Image
                      className="rounded-full"
                      fill={true}
                      src={data.picturePath}
                      alt="pro pic"
                    />
                  </div>
                  <FormField
                    name="text"
                    type="text"
                    placeholder="What's on your mind..."
                  />
                </div>
                <div className="h-[1px] w-full bg-slate-300/50 my-4"></div>
                <div className="flex items-center justify-between w-full">
                  <ImageUploadButton />
                  <button className="bg-sky-500 text-white px-4 py-2 rounded">
                    POST
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default PublishPost;
