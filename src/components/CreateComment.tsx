"use client";
import { useAppContext } from "@/context";
import { UserProps } from "@/types";

import Image from "next/image";

import { useState } from "react";
import { useSession } from "next-auth/react";

interface CreateCommentProps {
  postId: string;
  userId: string;
}

export const PostComment = ({ postId, userId }: CreateCommentProps) => {
  const {
    users,
    reFetchComment,
    setReFetchComment,
    setReFetchPosts,
    reFetchPosts,
  } = useAppContext();
  const createdUser = users.find((user: UserProps) => user._id === userId);
  const [comment, setComment] = useState("");
  const { data: session } = useSession();
  const handleCreatetComment = async (
    userId: string,
    postId: string,
    comment: string
  ) => {
    if (!comment) {
      return console.log("3amar dak l post");
    }

    try {
      const response = await fetch("/api/comment/new", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          postId: postId,
          comment: comment,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setComment("");
      setReFetchComment(reFetchComment + 1);
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  if (!session?.user?.email) {
    return <></>;
  }

  return (
    <>
      <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px]">
        <div className="h-12 w-12 relative rounded-full overflow-hidden">
          {createdUser && (
            <Image src={createdUser.img} fill sizes="100" alt="user avatar" />
          )}
        </div>

        <textarea
          className="w-full bg-black text-white text-lg p-3 outline-none resize-none"
          placeholder="Post your reply"
          maxLength={255}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full text-end mt-3 pb-2">
        <button
          className="blue-btn"
          onClick={() => handleCreatetComment(userId, postId, comment)}
        >
          Reply
        </button>
      </div>
    </>
  );
};
