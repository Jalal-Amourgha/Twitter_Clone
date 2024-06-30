"use client";

import { useAppContext } from "@/context";
import { UserProps } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const CommentCard = ({ comment, likeComment, loggedUser }: any) => {
  const { users, reFetchComment, setReFetchComment } = useAppContext();
  let creator = users.find((user: UserProps) => user._id === comment.creator);

  const handleCreatedAt = (date: string) => {
    return formatDistanceToNowStrict(new Date(date));
  };
  return (
    <div className="p-3 border-b-1 border-neutral-800">
      <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px] mb-3">
        <div className="h-12 w-12 relative rounded-full overflow-hidden">
          {creator && (
            <Image src={creator.img} fill sizes="100" alt="user avatar" />
          )}
        </div>
        <div>
          <div className="flex items center gap-2 text-neutral-500">
            <h1 className="text-white font-semibold">{creator.name}</h1>
            <p>@{creator.username}</p>
            <p>.</p>
            <p>{handleCreatedAt(comment.createdAt)}</p>
          </div>
          <p className="text-lg text-white">{comment.comment}</p>
        </div>
      </div>
      <div
        className="flex items-center gap-1 w-fit ml-[68px] mt-3 text-xl text-neutral-500 hover:text-red cursor-pointer"
        onClick={() => likeComment(comment._id)}
      >
        {comment.likes.includes(loggedUser._id) ? (
          <IoHeart className="text-red" />
        ) : (
          <IoHeartOutline />
        )}
        <span className="text-base">{comment.likes.length}</span>
      </div>
    </div>
  );
};

export default CommentCard;
