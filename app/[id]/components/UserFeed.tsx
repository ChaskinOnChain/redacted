"use client";

import Post from "@/app/homepage/components/Post";
import { getUserByEmail, getUserPosts } from "@/utils/api/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import UserPost from "./UserPost";

type Props = {
  id: string;
};

function UserFeed({ id }: Props) {
  const session = useSession();
  const email = session.data?.user?.email;
  const [usersPage, setUsersPage] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getUserPosts(id),
  });

  const { data: userData } = useQuery({
    queryKey: ["user", email],
    queryFn: () => getUserByEmail(email),
  });

  useEffect(() => {
    if (userData && userData._id === id) {
      setUsersPage(true);
    }
  }, [userData, id]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data &&
        data.map((post) => {
          return (
            <UserPost
              key={post._id}
              id={post._id}
              likes={post.likes}
              comments={post.comments}
              authorId={post.author}
              text={post.text}
              picture={post.picture}
              usersPage={usersPage}
            />
          );
        })}
    </div>
  );
}

export default UserFeed;
