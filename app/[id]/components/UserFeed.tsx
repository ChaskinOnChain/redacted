"use client";

import { getUserPosts } from "@/utils/api/apiUtils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import UserPost from "./UserPost";
import { useGetUserByEmail } from "@/app/hooks/queryHooks";

type Props = {
  id: string;
};

function UserFeed({ id }: Props) {
  const session = useSession();
  const email = session.data?.user?.email;
  const [usersPage, setUsersPage] = useState(false);

  const fetchPosts = ({ pageParam = 1 }) => getUserPosts(id, { pageParam });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(["posts"], fetchPosts, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.reachedLastPage) return undefined;
        return pages.length + 1;
      },
    });

  const { data: userData } = useGetUserByEmail(email || "");

  useEffect(() => {
    if (userData && userData._id === id) {
      setUsersPage(true);
    }
  }, [userData, id]);

  if (!email) {
    return null;
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post) => (
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
          ))}
        </React.Fragment>
      ))}
      {!isLoading && hasNextPage && (
        <div className="w-full flex justify-center">
          <button
            className="px-2 py-1 border-4 rounded-md hover:font-bold"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Show More"
              : "No more posts"}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserFeed;
