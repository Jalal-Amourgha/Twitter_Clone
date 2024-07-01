"use client";

import { useAppContext } from "@/context";
import { PostProps, UserProps } from "@/types";

import { HomePostCard } from "./PostCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DisplayPosts = () => {
  const { posts, users, setPosts } = useAppContext();
  const [loggedUser, setLoggedUser] = useState({ _id: "" });
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      setLoggedUser(
        users.find((user: UserProps) => user.email === session?.user?.email)
      );
    }
  }, [session?.user?.email]);

  return (
    <div className="flex flex-col">
      {posts &&
        users &&
        posts
          .slice()
          .reverse()
          .map((post: PostProps, index: number) => (
            <HomePostCard
              post={post}
              creator={users.find(
                (user: UserProps) => user._id === post.creator
              )}
              loggedUser={loggedUser}
              key={index}
            />
          ))}
    </div>
  );
};

export default DisplayPosts;
