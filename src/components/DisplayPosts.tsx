"use client";

import { useAppContext } from "@/context";
import { PostProps } from "@/types";

import { HomePostCard } from "./PostCard";

const DisplayPosts = () => {
  const { posts } = useAppContext();

  return (
    <div className="flex flex-col">
      {posts &&
        posts
          .slice()
          .reverse()
          .map((post: PostProps, index: number) => (
            <HomePostCard post={post} key={index} />
          ))}
    </div>
  );
};

export default DisplayPosts;
