"use client";

import { CreatePost } from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import { HomeLoading } from "@/components/Loading";
import WelcomePage from "@/components/WelcomePage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HomeLoading />;
  }

  return (
    <>
      {session?.user?.email ? <CreatePost /> : <WelcomePage />}

      <DisplayPosts />
    </>
  );
}
