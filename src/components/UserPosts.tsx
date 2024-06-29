"use client";

import { useAppContext } from "@/context";
import { PostProps } from "@/types";
import { useState } from "react";
import { HomePostCard } from "./PostCard";

const UserPosts = ({ userId }: { userId: string }) => {
  const { posts } = useAppContext();
  const [filter, setFilter] = useState<string>("creator");

  const FilterProps = [
    {
      id: 1,
      label: "Posts",
      filter: "creator",
    },
    {
      id: 2,
      label: "Replies",
      filter: "reposts",
    },
    {
      id: 3,
      label: "Likes",
      filter: "likes",
    },
    {
      id: 4,
      label: "Bookmarks",
      filter: "bookmarks",
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center px-4 pt-4 border-b-1 border-neutral-800">
        {FilterProps.map((item) => (
          <p
            className={`text-lg font-medium p-2 ${
              item.filter === filter
                ? "text-white  border-b-2 border-blue"
                : "text-neutral-500"
            } hover:bg-[#e7e9ea1a] cursor-pointer`}
            onClick={() => setFilter(item.filter)}
            key={item.id}
          >
            {item.label}
          </p>
        ))}
      </div>

      <div className="flex flex-col mb-10">
        {posts &&
          userId &&
          posts.map((post: any) =>
            post[filter].includes(userId) ? (
              <HomePostCard post={post} key={post._id} />
            ) : (
              ""
            )
          )}
      </div>

      {}
    </>
  );
};

export default UserPosts;
