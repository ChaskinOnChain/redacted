import { getPosts } from "@/utils/api/apiUtils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import Post from "./Post";
import { useSearch } from "../SearchContext/SearchHook";

function Feed() {
  const { search: searchQuery } = useSearch();
  console.log(searchQuery);

  const fetchPosts = ({ pageParam = 1 }) =>
    getPosts({ pageParam }, searchQuery);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(["posts", searchQuery], fetchPosts, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.reachedLastPage) return undefined;
        return pages.length + 1;
      },
    });

  return (
    <div className="mt-6">
      {isLoading && <p>Loading...</p>}
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.posts.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              likes={post.likes}
              comments={post.comments}
              authorId={post.author}
              text={post.text}
              picture={post.picture}
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

export default Feed;
