"use client";

import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({ _id: "" });
  const [reFetchUsers, setReFetchUsers] = useState(1);
  const [reFetchPosts, setReFetchPosts] = useState(1);
  const [createTweet, setCreateTweet] = useState(false);
  const [showCreateComment, setShowCreateComment] = useState(false);
  const [reFetchComment, setReFetchComment] = useState(0);
  const { data: session } = useSession();

  const fetchPosts = async () => {
    const data = await fetch(`/api/post`);
    const res = await data.json();

    return setPosts(res);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [reFetchUsers]);

  useEffect(() => {
    if (session?.user?.email && reFetchUsers) {
      setUserData(
        users.filter(
          (user: UserProps) => user.email === session?.user?.email
        )[0]
      );
    }
  }, [session?.user?.email, reFetchUsers, users]);

  useEffect(() => {
    fetchPosts();
  }, [reFetchPosts]);

  return (
    <AppContext.Provider
      value={{
        posts,
        users,
        userData,
        reFetchUsers,
        reFetchPosts,
        createTweet,
        showCreateComment,
        reFetchComment,
        setPosts,
        setUsers,
        setUserData,
        setReFetchUsers,
        setReFetchPosts,
        setCreateTweet,
        setShowCreateComment,
        setReFetchComment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
