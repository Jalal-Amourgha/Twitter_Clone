"use client";

import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({ _id: "" });
  const [reFetchUsers, setReFetchUsers] = useState(0);
  const [reFetchPosts, setReFetchPosts] = useState(0);
  const [newUser, setNewUser] = useState(0);
  const [reFetchComment, setReFetchComment] = useState(0);
  const { data: session } = useSession();

  const fetchData = async () => {
    const res = await fetch("/api/data", {
      cache: "no-store",
    });
    const data = await res.json();

    setPosts(data.posts);
    setUsers(data.users);
  };

  const fetchPosts = async () => {
    const res = await fetch("/api/post");
    const data = await res.json();

    setPosts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();

    setUsers(data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (reFetchPosts) {
  //     fetchPosts();
  //   }
  // }, [reFetchPosts]);

  // useEffect(() => {
  //   if (reFetchUsers) {
  //     fetchUsers();
  //   }
  // }, [reFetchUsers]);

  // useEffect(() => {
  //   if (session?.user?.email) {
  //     setUserData(
  //       users.filter(
  //         (user: UserProps) => user.email === session?.user?.email
  //       )[0]
  //     );
  //   }
  // }, [session?.user?.email, users]);

  return (
    <AppContext.Provider
      value={{
        posts,
        users,
        userData,
        reFetchUsers,
        reFetchPosts,

        reFetchComment,
        setPosts,
        setUsers,
        setUserData,
        setReFetchUsers,
        setReFetchPosts,
        setReFetchComment,
        newUser,
        setNewUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
