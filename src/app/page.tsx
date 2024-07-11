"use client";

import { CreatePost } from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import { HomeLoading } from "@/components/Loading";
import WelcomePage from "@/components/WelcomePage";
import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";

export default function Home() {
  const { posts, users } = useAppContext();
  const { data: session } = useSession();

  if (!posts || !users) {
    return <HomeLoading />;
  }

  return (
    <>
      {session?.user?.email ? <CreatePost /> : <WelcomePage />}

      <DisplayPosts />
    </>
  );
}
