"use client";

import { comment } from "@/assets";
import { useAppContext } from "@/context";
import { PostProps, UserProps } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const DisplayPosts = () => {
  const { posts, users } = useAppContext();

  const handleCreatedAt = (date: string) => {
    return formatDistanceToNowStrict(new Date(date));
  };

  return (
    <div className="flex flex-col">
      {posts &&
        posts
          .slice()
          .reverse()
          .map((post: PostProps, index: number) => {
            let createdUser = users.find(
              (user: UserProps) => user._id === post.creator
            );

            return (
              <div className="p-3 border-b-1 border-neutral-800">
                <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px]">
                  <div className="h-12 w-12 relative rounded-full overflow-hidden">
                    {createdUser && (
                      <Image
                        src={createdUser.img}
                        fill
                        sizes="100"
                        alt="user avatar"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-neutral-500 text-lg ">
                      <h1 className="text-xl text-white font-semibold">
                        {createdUser && createdUser.name}
                      </h1>
                      <span>@{createdUser && createdUser.username}</span>
                      <span>{handleCreatedAt(post.createdAt)}</span>
                    </div>
                    <p className="text-white text-lg mt-2">{post.post}</p>
                    <div className="flex items-center gap-4 text-neutral-500 mt-4">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                          src={comment}
                          width={20}
                          height={20}
                          alt="comment icon"
                        />
                        <span>{post.comments.length}</span>
                      </div>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <IoHeartOutline size={20} />
                        <span>{post.likes.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DisplayPosts;
