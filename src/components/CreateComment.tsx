"use client";
import { useAppContext } from "@/context";
import { PostProps, UserProps } from "@/types";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { CommentPostCard } from "./PostCard";
import { useState } from "react";

interface CreateCommentProps {
  postId: string;
  userId: string;
}

export const CreateComment = ({ postId, userId }: CreateCommentProps) => {
  const { posts, users, userData, setShowCreateComment } = useAppContext();
  const createdUser = users.filter((user: UserProps) => user._id === userId)[0];
  const [comment, setComment] = useState("");

  const handleCreatetComment = async (
    userId: string,
    postId: string,
    comment: string
  ) => {
    if (!comment) {
      return console.log("3amar dak l post");
    }

    console.log(userId, postId, comment);

    try {
      const response = await fetch("api/comment/new", {
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
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none bg-white/10 text-white bg-opacity-70"
      onClick={() => setShowCreateComment(false)}
    >
      <div
        className="bg-black max-w-[600px] w-full p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full hover:text-blue cursor-pointer mb-5"
          onClick={() => setShowCreateComment(false)}
        >
          <IoCloseOutline size={25} className="ml-auto" />
        </div>
        <CommentPostCard postId={postId} userId={userId} />
        <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px] mt-10 pt-5 border-t-1 border-neutral-800">
          <div className="h-12 w-12 relative rounded-full overflow-hidden">
            {createdUser && (
              <Image src={userData.img} fill sizes="100" alt="user avatar" />
            )}
          </div>
          <textarea
            className="w-full bg-black p-2 text-lg text-white border-none outline-none resize-none"
            placeholder="Post your reply"
            maxLength={200}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full text-end mt-5">
          <button
            className="blue-btn"
            onClick={() => handleCreatetComment(userId, postId, comment)}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export const PostComment = ({ postId, userId }: CreateCommentProps) => {
  const { users } = useAppContext();
  const createdUser = users.find((user: UserProps) => user._id === userId);
  const [comment, setComment] = useState("");

  const handleCreatetComment = async (
    userId: string,
    postId: string,
    comment: string
  ) => {
    if (!comment) {
      return console.log("3amar dak l post");
    }

    console.log(userId, postId, comment);

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
    }
  };

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
