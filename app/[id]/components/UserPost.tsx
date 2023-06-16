import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faHeart,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { getUserByEmail, getUserById } from "@/utils/api/apiUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Delete from "./Delete";
import { useGetUserByEmail, useGetUserById } from "@/app/hooks/queryHooks";

type Props = {
  authorId: string;
  text: string;
  picture: string;
  comments: [{ text: string; email: string }];
  likes: [string];
  id: string;
  usersPage: boolean;
};

type CommentData = {
  text: string;
  email: string;
};

const schema = yup.object().shape({
  text: yup.string().required("required"),
  commenterEmail: yup.string().required("required"),
});

const UserPost = ({
  authorId,
  text,
  picture,
  comments,
  likes,
  id,
  usersPage,
}: Props) => {
  const [likeRequestInProgress, setLikeRequestInProgress] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const session = useSession();
  const email = session.data?.user?.email;
  const { isLoading, data } = useGetUserById(authorId);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [liked, setLiked] = useState(false);

  const { data: returnedUser } = useGetUserByEmail(email);

  const initialValues = {
    text: "",
    commenterEmail: email,
  };

  const { data: commentUsers, isLoading: isLoadingCommentUsers } = useQuery({
    queryKey: ["commentUsers", comments],
    queryFn: async () => {
      const userPromises = comments.map((comment: CommentData) =>
        getUserByEmail(comment.email)
      );
      return Promise.all(userPromises);
    },
    enabled: comments.length > 0,
  });

  async function addLike() {
    setLikeRequestInProgress(true);
    try {
      await axios.post(`api/posts/${id}/likes`, {
        liked,
        authorId: returnedUser._id,
      });
      setLiked((prev) => {
        if (prev) {
          setLikesCount((count) => count - 1);
        } else {
          setLikesCount((count) => count + 1);
        }
        return !prev;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLikeRequestInProgress(false);
    }
  }

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const res = await axios.post(`/api/posts/${id}/comments`, values);
      if (res.status === 201) {
        onSubmitProps.resetForm();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (returnedUser) {
      if (likes.includes(returnedUser._id)) {
        setLiked(true);
        if (likesCount === 0) {
          setLikesCount(1);
        }
      } else {
        setLiked(false);
      }
    }
  }, [returnedUser, authorId]);

  if (!email) {
    return null;
  }

  return (
    <div className="border-4 rounded-md px-4 pt-4 pb-2 mb-4 shadow-md xl:max-w-[550px] w-full relative">
      {isLoading && <p>Loading...</p>}
      {data && (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  className="rounded-full"
                  fill={true}
                  src={data.picturePath}
                  alt="pro pic"
                />
              </div>

              <div>
                <p className="font-bold">
                  {data.firstName + " " + data.lastName}
                </p>
                <p>{data.location}</p>
              </div>
            </div>
          </div>
          {usersPage && <Delete id={id} />}
          <p className="my-2">{text}</p>
          {picture && (
            <img
              onClick={() => !likeRequestInProgress && addLike()}
              className="cursor-pointer rounded-md"
              src={picture}
              alt={text}
            />
          )}
          <div className="flex mt-2 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon
                onClick={() => !likeRequestInProgress && addLike()}
                className={`cursor-pointer ${liked && "text-sky-500"}`}
                icon={faHeart}
              />
              <span>{likesCount}</span>
            </div>
          </div>
          {comments.length ? (
            <p
              onClick={() => setShowComments((prev) => !prev)}
              className="cursor-pointer"
            >
              {comments.length === 1
                ? "View 1 Comment"
                : `View all ${comments.length} comments`}
            </p>
          ) : (
            <p>No Comments</p>
          )}
          {showComments &&
            comments.map((comment: CommentData, index: number) => {
              const commentUser = commentUsers[index];
              return (
                <div className="flex items-center gap-4 my-1" key={index}>
                  <div className="w-12 h-12 relative">
                    <Image
                      className="rounded-full"
                      fill={true}
                      src={commentUser.picturePath}
                      alt="pro pic"
                    />
                  </div>
                  <div>
                    <p className="font-bold">
                      {commentUser.firstName + " " + commentUser.lastName}
                    </p>
                    <p>{comment.text}</p>
                  </div>
                </div>
              );
            })}
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={schema}
          >
            {({ values, setFieldValue }) => (
              <Form className="w-full">
                <Field
                  name="text"
                  placeholder="Add a comment..."
                  type="text"
                  className="w-full p-1 rounded mt-3"
                />
                <button type="submit" style={{ display: "none" }}></button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default UserPost;
