"use client";

import React, { useState } from "react";
import { getUserById } from "@/utils/api/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSuitcase,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const schemaOccupation = yup.object().shape({
  occupation: yup.string().required("required"),
  userId: yup.string().required("required"),
});

const schemaLocation = yup.object().shape({
  location: yup.string().required("required"),
  userId: yup.string().required("required"),
});

type Props = {
  id: string;
};

const UserProfile = ({ id }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isEdittingLocation, setIsEdittingLocation] = useState(false);
  const [isEdittingOccupation, setIsEdittingOccupation] = useState(false);
  const { isLoading, data } = useQuery({
    queryKey: ["user", id],
    queryFn: () => id && getUserById(id),
    enabled: !!id,
  });

  const initialValuesOccupation = {
    occupation: "",
    userId: data?._id,
  };

  const initialValuesLocation = {
    location: "",
    userId: data?._id,
  };

  const handleOccupation = async (values, onSubmitProps) => {
    try {
      const res = await axios.put(
        `/api/users/${data._id}/occupation?occupation=${values.occupation}`
      );
      if (res.status === 201) {
        onSubmitProps.resetForm();
        queryClient.invalidateQueries(["user"]);
        setIsEdittingOccupation(false);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  const handleLocation = async (values, onSubmitProps) => {
    try {
      const res = await axios.put(
        `/api/users/${data._id}/location?location=${values.location}`
      );
      if (res.status === 201) {
        onSubmitProps.resetForm();
        queryClient.invalidateQueries(["user"]);
        setIsEdittingLocation(false);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  return (
    <>
      {isLoading && <p> Loading...</p>}
      {data && (
        <div
          className={`shadow-md min-w-[20rem] h-72 p-4 rounded-md border-4 flex flex-col justify-between`}
        >
          <div className="flex gap-3">
            <div className="h-16 w-16 relative cursor-pointer">
              <Image
                className="rounded-full"
                fill={true}
                src={data.picturePath}
                alt="pro pic"
                onClick={() => router.push(`/${data._id}`)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p
                onClick={() => router.push(`/${data._id}`)}
                className="cursor-pointer font-bold capitalize"
              >
                {data.firstName} {data.lastName}
              </p>
              <p>
                {data.friends.length} friend
                {data.friends.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-slate-300/50 my-4"></div>
          <div className="flex item-center justify-between">
            <div className="flex pl-[3px] gap-4 items-center">
              <FontAwesomeIcon icon={faLocationDot} />
              {!isEdittingLocation ? (
                <p className="text-sm">
                  {data.location ? data.location : "No Location"}
                </p>
              ) : (
                <Formik
                  onSubmit={handleLocation}
                  initialValues={initialValuesLocation}
                  validationSchema={schemaLocation}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="w-full">
                      <Field
                        autoFocus
                        name="location"
                        placeholder="Location Here..."
                        type="text"
                        className="w-full text-sm rounded"
                      />
                      <button
                        type="submit"
                        style={{ display: "none" }}
                      ></button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                onClick={() => setIsEdittingLocation((prev) => !prev)}
                className="cursor-pointer"
                icon={faEdit}
              />
            </div>
          </div>
          <div className="flex item-center justify-between">
            <div className="flex gap-4 mt-2 items-center">
              <FontAwesomeIcon icon={faSuitcase} />
              {!isEdittingOccupation ? (
                <p className="text-sm">
                  {data.occupation ? data.occupation : "No occupation"}
                </p>
              ) : (
                <Formik
                  onSubmit={handleOccupation}
                  initialValues={initialValuesOccupation}
                  validationSchema={schemaOccupation}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="w-full">
                      <Field
                        autoFocus
                        name="occupation"
                        placeholder="Occupation Here..."
                        type="text"
                        className="w-full text-sm rounded"
                      />
                      <button
                        type="submit"
                        style={{ display: "none" }}
                      ></button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
            <div className="flex items-center justify-center">
              <FontAwesomeIcon
                onClick={() => setIsEdittingOccupation((prev) => !prev)}
                className="cursor-pointer"
                icon={faEdit}
              />
            </div>
          </div>
          <div className="h-[1px] w-full bg-slate-300/50 my-4"></div>
          <div className="flex items-center justify-between text-sm">
            <p>Who's viewed your profile</p>
            <p className="font-bold">{data.viewedProfile}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <p>Impressions of your post</p>
            <p className="font-bold">{data.impressions}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
