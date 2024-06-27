"use client";

import { CreatePost, CreateTweet } from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import WelcomePage from "@/components/WelcomePage";
import { useAppContext } from "@/context";

import { useSession } from "next-auth/react";

export default function Home() {
  const { createTweet } = useAppContext();
  const { data: session } = useSession();

  return (
    <>
      {session?.user?.email ? <CreatePost /> : <WelcomePage />}

      <DisplayPosts />

      {createTweet ? <CreateTweet /> : ""}
    </>
  );
}
