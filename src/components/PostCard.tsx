"use client";

import Image from "next/image";
import { format, formatDistanceToNowStrict } from "date-fns";
import {
  IoPencil,
  IoTrashOutline,
  IoBookmarkOutline,
  IoBookmark,
} from "react-icons/io5";
import { RxShare2 } from "react-icons/rx";
import { TbRepeat } from "react-icons/tb";
import { FaRegCommentDots, FaHeart, FaRegHeart } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostComment } from "./CreateComment";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";

export const HomePostCard = ({ post, creator, loggedUser }: any) => {
  const {
    reFetchPosts,
    setReFetchPosts,
    deletePost,
    setDeletePost,
    editPost,
    setEditPost,
  } = useAppContext();
  const [showCopy, setShowCopy] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const viewPost = (postId: string, userId: string) => {
    return router.push(`/post/${postId}`);
  };

  const handleCreatedAt = (date: string) => {
    return formatDistanceToNowStrict(new Date(date));
  };

  const handleLikePost = async (postId: string, userId: string) => {
    if (!session?.user?.email) return;
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
    if (!session?.user?.email) return;
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
    if (!session?.user?.email) return;
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

  const handleDeletePost = async (postId: string) => {
    if (!session?.user?.email) return;
    try {
      const response = await fetch(`/api/post/${postId.toString()}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setReFetchPosts(reFetchPosts + 1);
    }
  };

  const handleEditPost = async (post: string, postId: string) => {
    if (!session?.user?.email) return;
    setDeletePost({ visibility: false });
    setEditPost({ post: post, postId: postId, visibility: true });
  };

  return (
    <>
      <div
        className="p-3 border-b-1 border-neutral-800 relative"
        onClick={() => viewPost(post._id, creator._id)}
      >
        <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px]">
          <div className="h-12 w-12 relative rounded-full overflow-hidden">
            <Image src={creator.img} fill sizes="100" alt="user avatar" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-neutral-500 text-lg ">
              <h1 className="text-xl text-white font-semibold">
                {creator.name}
              </h1>
              <span className="hidden sm:block">@{creator.username}</span>
              <span>{handleCreatedAt(post.createdAt)}</span>
            </div>
            <p className="text-white text-lg mt-2">{post.post}</p>
            <div className="w-full flex justify-between items-center gap-4 text-neutral-500 mt-5">
              <div
                className={`${
                  post.comments.includes(loggedUser._id) ? "text-blue" : ""
                } flex items-center gap-2 hover:text-blue cursor-pointer`}
                onClick={() => viewPost(post._id, creator._id)}
              >
                <FaRegCommentDots size={20} />
                <span>{post.comments.length}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  post.reposts.includes(loggedUser._id) ? "text-green" : ""
                } hover:text-green cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRePost(post._id, loggedUser._id);
                }}
              >
                <TbRepeat size={20} />
                <span>{post.reposts.length}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  post.likes.includes(loggedUser._id) ? "text-red" : ""
                } hover:text-red cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();

                  handleLikePost(post._id, loggedUser._id);
                }}
              >
                {post.likes.includes(loggedUser._id) ? (
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
                    handleSaveToBookmark(post._id, loggedUser._id);
                  }}
                >
                  {post.bookmarks.includes(loggedUser._id) ? (
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
                  <div
                    className="absolute  bottom-10 -right-4 w-48 z-50 bg-black text-white hover:text-green p-3 rounded-lg border-1 border-white flex items-center gap-2 link__shadow cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(
                        `https://twitter-clone-five-zeta.vercel.app/post/${post._id}`
                      );
                      setShowCopy(!showCopy);
                    }}
                  >
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

        {loggedUser._id === creator._id ? (
          <div
            className="absolute top-3 right-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setDeletePost({
                id: post._id,
                visibility: !deletePost.visibility,
              });
            }}
          >
            <BiDotsHorizontalRounded className="text-2xl text-neutral-500" />
          </div>
        ) : (
          ""
        )}

        {deletePost.visibility && deletePost.id === post._id ? (
          <div className="absolute top-8 right-0 flex flex-col gap-2 w-48 bg-black text-white p-2 rounded-md border-1 border-white">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleEditPost(post.post, post._id);
              }}
            >
              <IoPencil />
              <p>Edit Tweet</p>
            </div>
            <div
              className="flex items-center gap-1 text-[#f87171] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePost(post._id);
              }}
            >
              <IoTrashOutline />
              <p>Delete Tweet</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export const PostCard = ({ post, creator, loggedUser }: any) => {
  const { reFetchPosts, setReFetchPosts } = useAppContext();
  const { data: session } = useSession();
  const [showCopy, setShowCopy] = useState(false);
  const router = useRouter();
  const handlePublishedAt = (date: string) => {
    return format(new Date(date), "h:mm a '·' MMM d, yyyy");
  };
  const handleLikePost = async (postId: string, userId: string) => {
    if (!session?.user?.email) return;
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
    if (!session?.user?.email) return;
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
    if (!session?.user?.email) return;
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

  const viewPost = (postId: string, userId: string) => {
    return router.push(`/post/${postId}`);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-[60px_calc(100%-70px)] gap-[10px]">
        <div className="h-12 w-12 relative rounded-full overflow-hidden">
          <Image src={creator.img} fill sizes="100" alt="user avatar" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-white font-semibold">{creator.name}</h1>
          <p className="text-neutral-500 hidden sm:block">
            @{creator.username}
          </p>
        </div>
      </div>
      <p className="text-white text-lg my-5">{post.post}</p>
      <div className="text-neutral-500">
        {handlePublishedAt(post.createdAt)}
      </div>
      <div className="w-full flex justify-between items-center  text-neutral-500 my-4 py-3 border-y-1 border-neutral-800  ">
        <div
          className={`${
            post.comments.includes(loggedUser._id) ? "text-blue" : ""
          } flex items-center gap-2 hover:text-blue cursor-pointer`}
          onClick={() => viewPost(post._id, creator._id)}
        >
          <FaRegCommentDots size={20} />
          <span>{post.comments.length}</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            post.reposts.includes(loggedUser._id) ? "text-green" : ""
          } hover:text-green cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            handleRePost(post._id, loggedUser._id);
          }}
        >
          <TbRepeat size={20} />
          <span>{post.reposts.length}</span>
        </div>
        <div
          className={`flex items-center gap-2 ${
            post.likes.includes(loggedUser._id) ? "text-red" : ""
          } hover:text-red cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();

            handleLikePost(post._id, loggedUser._id);
          }}
        >
          {post.likes.includes(loggedUser._id) ? (
            <FaHeart size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}

          <span>{post.likes.length}</span>
        </div>

        <div
          className="text-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleSaveToBookmark(post._id, loggedUser._id);
          }}
        >
          {post.bookmarks.includes(loggedUser._id) ? (
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
          <div
            className="absolute  top-[100px] -right-0 w-48 z-50 bg-black text-white hover:text-green p-3 rounded-lg border-1 border-white flex items-center gap-2 link__shadow cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(
                `https://twitter-clone-five-zeta.vercel.app/post/${post._id}`
              );
              setShowCopy(!showCopy);
            }}
          >
            <LuLink size={20} />
            <p>Copy link</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <PostComment postId={post._id} userId={loggedUser._id} />
    </div>
  );
};
