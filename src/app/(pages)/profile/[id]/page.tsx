"use client";

import { Header } from "@/components/Header";
import UserInfo from "@/components/UserInfo";
import UserPosts from "@/components/UserPosts";
import { useAppContext } from "@/context";
import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { DiVisualstudio } from "react-icons/di";

interface PageProps {
  params: {
    id: string;
  };
}

const UserProfile = ({ params }: PageProps) => {
  const { users, userData, reFetchUsers, setReFetchUsers } = useAppContext();
  const selectedUser = users.filter(
    (user: UserProps) => user.username === params.id
  )[0];

  const { data: session } = useSession();
  const isUserFollowed = selectedUser.followers.includes(userData?._id);

  const handleFollow = async () => {
    try {
      const response = await fetch(`/api/user/following`, {
        method: "PATCH",
        body: JSON.stringify({
          id1: userData._id,
          id2: selectedUser._id,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setReFetchUsers(reFetchUsers + 1);
    }
  };

  if (!selectedUser) {
    <h1 className="text-white text-2xl font-bold">Loading ....</h1>;
  }

  return (
    <>
      <Header title={selectedUser.username} />

      {/* User -  Bannner */}
      <div className="w-full h-[250px] relative">
        {selectedUser.banner ? (
          <Image
            src={selectedUser.banner}
            fill
            sizes="100%"
            className="object-cover "
            alt="banner image"
          />
        ) : (
          <div className="h-full w-full bg-slate-500"></div>
        )}
      </div>

      {/* User - Image */}
      <div className="flex justify-between mx-6">
        <div className="mt-[-60px] border-[5px] border-black rounded-full relative z-10">
          <Image
            src={selectedUser.img}
            height={120}
            width={120}
            sizes="100%"
            className="rounded-full"
            alt="user image"
          />
        </div>
        {session?.user?.email ? (
          <button
            className={`${isUserFollowed ? "border-btn" : "white-btn"} `}
            onClick={handleFollow}
          >
            {isUserFollowed ? "unfollow" : "Follow"}
          </button>
        ) : (
          <DiVisualstudio></DiVisualstudio>
        )}
      </div>

      {/* User - Info Details */}
      <UserInfo userData={selectedUser} />

      {/* User - Posts - Replies - Likes */}
      <UserPosts userId={selectedUser._id} />
    </>
  );
};

export default UserProfile;
