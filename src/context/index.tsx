"use client";

import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState();
  const [reFetchUsers, setReFetchUsers] = useState(1);
  const [reFetchPosts, setReFetchPosts] = useState(1);
  const [createTweet, setCreateTweet] = useState(false);
  const { data: session } = useSession();

  const fetchPosts = async () => {
    const data = await fetch(`/api/post`);

    const res = await data.json();
    console.log(res);
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
        setPosts,
        setUsers,
        setUserData,
        setReFetchUsers,
        setReFetchPosts,
        setCreateTweet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
