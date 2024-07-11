"use client";

import { useAppContext } from "@/context";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
const EditPost = ({ post, postId }: { post: string; postId: string }) => {
  const { setEditPost, reFetchPosts, setReFetchPosts } = useAppContext();
  const [newPost, setNewPost] = useState(post);

  const EditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          newPost: newPost,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditPost({ visibility: false });
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none bg-neutral-800 bg-opacity-70">
      <form
        onSubmit={EditPost}
        className="p-7 rounded-xl bg-black text-white max-w-[600px] w-full"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Edit Post</h1>
          <IoClose
            size={25}
            className="cursor-pointer"
            onClick={() => setEditPost({ visibility: false })}
          />
        </div>

        <textarea
          className="w-full bg-black border-none resize-none outline-none text-xl my-10"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What is happening?"
        ></textarea>

        <div className="w-full text-end">
          <button type="submit" className="blue-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
