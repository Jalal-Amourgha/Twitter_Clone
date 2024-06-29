"use client";

import { useAppContext } from "@/context";
import { PostProps, UserProps } from "@/types";
import Image from "next/image";
import { format, formatDistanceToNowStrict } from "date-fns";
import {
  IoHeartOutline,
  IoHeart,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { RxShare2 } from "react-icons/rx";
import { TbRepeat } from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateComment, PostComment } from "./CreateComment";
import { useSession } from "next-auth/react";

const handleCreatedAt = (date: string) => {
  return formatDistanceToNowStrict(new Date(date));
};

export const HomePostCard = ({ post }: any) => {
  const {
    posts,
    users,
    reFetchPosts,
    setReFetchPosts,
    showCreateComment,
    setShowCreateComment,
  } = useAppContext();
  let createdUser = users.find((user: UserProps) => user._id === post.creator);
  const [showCopy, setShowCopy] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const viewPost = (postId: string, userId: string) => {
    return router.push(`/post/${postId}`);
  };

  const handleLikePost = async (postId: string, userId: string) => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }

    try {
      const response = await fetch(`/api/post`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "like",
          postId: postId,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  const handleRePost = async (postId: string, userId: string) => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }
    try {
      const response = await fetch(`/api/post`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "repost",
          postId: postId,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  const handleSaveToBookmark = async (postId: string, userId: string) => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }
    try {
      const response = await fetch(`/api/post`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "bookmark",
          postId: postId,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  const handleCreateComment = () => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }

    setShowCreateComment(true);
  };
  return (
    <>
      <div
        className="p-3 border-b-1 border-neutral-800"
        onClick={() => viewPost(post._id, createdUser._id)}
      >
        <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px]">
          <div className="h-12 w-12 relative rounded-full overflow-hidden">
            {createdUser && (
              <Image src={createdUser.img} fill sizes="100" alt="user avatar" />
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
            <div className="w-full flex justify-between items-center gap-4 text-neutral-500 mt-5">
              <div
                className="flex items-center gap-2 hover:text-blue cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateComment();
                }}
              >
                <FaRegCommentDots size={20} />
                <span>{post.comments.length}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  post.reposts.includes(createdUser && createdUser._id)
                    ? "text-green"
                    : ""
                } hover:text-green cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRePost(post._id, createdUser._id);
                }}
              >
                <TbRepeat size={20} />
                <span>{post.reposts.length}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  post.likes.includes(createdUser && createdUser._id)
                    ? "text-red"
                    : ""
                } hover:text-red cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();

                  handleLikePost(post._id, createdUser._id);
                }}
              >
                {post.likes.includes(createdUser._id) ? (
                  <FaHeart size={20} />
                ) : (
                  <FaRegHeart size={20} />
                )}

                <span>{post.likes.length}</span>
              </div>
              <div className="flex items-center gap-2 relative">
                <div
                  className="text-xl cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveToBookmark(post._id, createdUser._id);
                  }}
                >
                  {post.bookmarks.includes(createdUser._id) ? (
                    <IoBookmark size={20} className="text-red cursor-pointer" />
                  ) : (
                    <IoBookmarkOutline
                      size={20}
                      className="hover:text-red cursor-pointer"
                    />
                  )}
                </div>

                <RxShare2
                  size={20}
                  className="hover:text-green  cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCopy(!showCopy);
                  }}
                />
                {showCopy ? (
                  <div className="absolute  bottom-10 -right-4 w-48 bg-black text-white p-3 rounded-lg border-1 border-white flex items-center gap-2 link__shadow">
                    <LuLink size={20} />
                    <p>Copy link</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCreateComment ? (
        <CreateComment postId={post._id} userId={createdUser._id} />
      ) : (
        ""
      )}
    </>
  );
};

export const PostCard = ({ postId, userId }: any) => {
  const { posts, users, reFetchPosts, setShowCreateComment, setReFetchPosts } =
    useAppContext();
  let postSelected = posts.find((post: PostProps) => post._id === postId);
  let createdUser = users.find((user: UserProps) => user._id === userId);
  const { data: session } = useSession();
  const handlePublishedAt = (date: string) => {
    return format(new Date(date), "h:mm a '·' MMM d, yyyy");
  };

  const handleLikePost = async (postId: string, userId: string) => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }
    try {
      const response = await fetch(`/api/post`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "like",
          postId: postId,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  const handleRePost = async (postId: string, userId: string) => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }
    try {
      const response = await fetch(`/api/post`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "repost",
          postId: postId,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  const handleSaveToBookmark = async (postId: string, userId: string) => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }
    try {
      const response = await fetch(`/api/post`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "bookmark",
          postId: postId,
          userId: userId,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  const handleCreateComment = () => {
    if (!session?.user?.email) {
      return alert("sir f7alk");
    }

    setShowCreateComment(true);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px]">
        <div className="h-12 w-12 relative rounded-full overflow-hidden">
          {createdUser && (
            <Image src={createdUser.img} fill sizes="100" alt="user avatar" />
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-semibold">{createdUser.name}</h1>
          <p className="text-neutral-500">@{createdUser.username}</p>
        </div>
      </div>
      <p className="text-white text-lg my-5">{postSelected.post}</p>
      <div className="text-neutral-500">
        {handlePublishedAt(postSelected.createdAt)}
      </div>
      <div className="w-full flex justify-between items-center  text-neutral-500 my-4 py-3 border-y-1 border-neutral-800  ">
        <div
          className="flex items-center gap-2 hover:text-blue cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleCreateComment();
          }}
        >
          <FaRegCommentDots size={20} />
          <span>{postSelected.comments.length}</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            postSelected.reposts.includes(createdUser && createdUser._id)
              ? "text-green"
              : ""
          } hover:text-green cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            handleRePost(postSelected._id, createdUser._id);
          }}
        >
          <TbRepeat size={20} />
          <span>{postSelected.reposts.length}</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            postSelected.likes.includes(createdUser && createdUser._id)
              ? "text-red"
              : ""
          } hover:text-red cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();

            handleLikePost(postSelected._id, createdUser._id);
          }}
        >
          {postSelected.likes.includes(createdUser._id) ? (
            <FaHeart size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}

          <span>{postSelected.likes.length}</span>
        </div>

        <div
          className="text-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleSaveToBookmark(postSelected._id, createdUser._id);
          }}
        >
          {postSelected.bookmarks.includes(createdUser._id) ? (
            <IoBookmark size={20} className="text-red cursor-pointer" />
          ) : (
            <IoBookmarkOutline
              size={20}
              className="hover:text-red cursor-pointer"
            />
          )}
        </div>

        <RxShare2
          size={20}
          className="hover:text-green  cursor-pointer"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   setShowCopy(!showCopy);
          // }}
        />
        {/* 
        <div className="absolute  bottom-10 -right-4 w-48 bg-black text-white p-3 rounded-lg border-1 border-white flex items-center gap-2 link__shadow">
          <LuLink size={20} />
          <p>Copy link</p>
        </div> */}
      </div>

      <PostComment postId={postId} userId={userId} />
    </div>
  );
};

export const CommentPostCard = ({ postId, userId }: any) => {
  const { posts, users } = useAppContext();
  let postSelected = posts.find((post: PostProps) => post._id === postId);
  let createdUser = users.find((user: UserProps) => user._id === userId);

  return (
    <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px]">
      <div className="h-12 w-12 relative rounded-full overflow-hidden">
        {createdUser && (
          <Image src={createdUser.img} fill sizes="100" alt="user avatar" />
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-neutral-500 text-lg ">
          <h1 className="text-xl text-white font-semibold">
            {createdUser && createdUser.name}
          </h1>
          <span>@{createdUser && createdUser.username}</span>
          <span>{handleCreatedAt(postSelected.createdAt)}</span>
        </div>
        <p className="text-white text-lg mt-2 mb-5">{postSelected.post}</p>
        <p className="text-neutral-500">
          Replay to <span className="text-blue">@{createdUser.username}</span>
        </p>
      </div>
    </div>
  );
};
