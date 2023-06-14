import { getPosts } from "@/utils/api/apiUtils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Post from "./Post";

type Props = {
  email: string;
};

function Feed({ email }: Props) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  return (
    <div className="mt-6">
      {isLoading && <p>Loading...</p>}
      {data &&
        data.map((post) => {
          return (
            <Post
              key={post._id}
              authorId={post.author}
              text={post.text}
              picture={post.picture}
            />
          );
        })}
    </div>
  );
}

export default Feed;
