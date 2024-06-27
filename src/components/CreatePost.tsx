"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import { useState } from "react";

export const CreatePost = () => {
  const { userData, reFetchPosts, setReFetchPosts } = useAppContext();
  const [post, setPost] = useState<string>("");

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post) {
      console.log("3amar dak l post");
      return;
    }

    try {
      const response = await fetch("api/post/new", {
        method: "POST",
        body: JSON.stringify({
          userId: userData._id,
          post: post,
        }),
      });

      if (response.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPost("");
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  if (!userData) {
    return;
  }

  return (
    <>
      <div className="w-full p-4 text-white text-xl font-semibold">Home</div>
      <form
        onSubmit={handleCreatePost}
        className="w-full  p-2 border-y-1 border-neutral-800"
      >
        <div className="grid grid-cols-[70px_calc(100%-80px)] gap-[10px]">
          <div className="h-12 w-12 relative rounded-full overflow-hidden mx-auto">
            <Image src={userData.img} fill sizes="100%" alt="user image" />
          </div>

          <textarea
            name=""
            id=""
            className="w-full bg-black text-white text-lg p-2 border-b-1 border-neutral-800 outline-none"
            placeholder="What is happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full text-end mt-3 mb-2">
          <button type="submit" className="blue-btn">
            Tweet
          </button>
        </div>
      </form>
    </>
  );
};

export const CreateTweet = () => {
  const { userData, reFetchPosts, setReFetchPosts, setCreateTweet } =
    useAppContext();
  const [post, setPost] = useState<string>("");

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!post) {
      console.log("3amar dak l post");
      return;
    }

    try {
      const response = await fetch("api/post/new", {
        method: "POST",
        body: JSON.stringify({
          userId: userData._id,
          post: post,
        }),
      });

      if (response.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPost("");
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  if (!userData) {
    return;
  }

  return (
    <div
      className="flex items-center justify-center h-screen w-full overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none bg-neutral-800 bg-opacity-70 cursor-pointer"
      onClick={(e) => setCreateTweet(false)}
    >
      <div
        className="bg-black p-4 rounded-lg border-1 border-white max-w-[600px] w-full relative z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-[70px_calc(100%-80px)] gap-[10px]">
          <div className="h-12 w-12 relative rounded-full overflow-hidden mx-auto">
            <Image src={userData.img} fill sizes="100%" alt="user image" />
          </div>

          <textarea
            name=""
            id=""
            className="w-full bg-black text-white text-lg p-2 border-b-1 border-neutral-800 outline-none"
            placeholder="What is happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            rows={5}
            cols={5}
          ></textarea>
        </div>
        <div className="w-full text-end mt-4">
          <button className="blue-btn">Tweet</button>
        </div>
      </div>
    </div>
  );
};
