"use client";

import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, cache } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({ _id: "" });
  const [reFetchUsers, setReFetchUsers] = useState(0);
  const [reFetchPosts, setReFetchPosts] = useState(0);
  const [reFetchComment, setReFetchComment] = useState(0);
  const [deletePost, setDeletePost] = useState({ id: "", visibility: false });
  const [editPost, setEditPost] = useState({
    post: "",
    postId: "",
    visibility: false,
  });
  const { data: session } = useSession();

  const fetchData = async () => {
    const res = await fetch("/api/data/9999/all", {
      cache: "no-store",
    });
    const data = await res.json();

    setPosts(data.posts);
    setUsers(data.users);
  };

  useEffect(() => {
    fetchData();
  }, [reFetchPosts, reFetchUsers]);

  useEffect(() => {
    if (session?.user?.email) {
      setUserData(
        users.filter(
          (user: UserProps) => user.email === session?.user?.email
        )[0]
      );
    }
  }, [session?.user?.email, users]);

  return (
    <AppContext.Provider
      value={{
        posts,
        users,
        userData,
        reFetchUsers,
        reFetchPosts,
        reFetchComment,
        deletePost,
        editPost,
        setPosts,
        setUsers,
        setUserData,
        setReFetchUsers,
        setReFetchPosts,
        setReFetchComment,
        setDeletePost,
        setEditPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
