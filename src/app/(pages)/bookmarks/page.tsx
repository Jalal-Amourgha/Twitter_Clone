"use client";

import { Header } from "@/components/Header";
import { HomePostCard } from "@/components/PostCard";
import { useAppContext } from "@/context";
import { PostProps, UserProps } from "@/types";
import { useEffect, useState } from "react";

const BookmarksPage = () => {
  const { posts, userData } = useAppContext();
  const [userBookmarks, setUserBookmarks] = useState([]);

  useEffect(() => {
    if (posts && userData) {
      var bookmarkPosts = posts.filter((post: PostProps) =>
        post.bookmarks.includes(userData._id)
      );
      setUserBookmarks(bookmarkPosts);
    }
  }, [posts, userData]);

  return (
    <>
      <Header title="Bookmarks" />
      <div className="flex flex-col">
        {userBookmarks &&
          userBookmarks.map((post: PostProps) => (
            <HomePostCard post={post} key={post._id} />
          ))}
      </div>
    </>
  );
};

export default BookmarksPage;