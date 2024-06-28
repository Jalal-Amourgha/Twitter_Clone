"use client";
import { FaArrowLeft } from "react-icons/fa6";

import { useAppContext } from "@/context";
import Image from "next/image";
import UserInfo from "@/components/UserInfo";
import EditProfile from "@/components/EditProfile";
import { useState } from "react";
import { Header } from "@/components/Header";

const MyProfile = () => {
  const { userData } = useAppContext();
  const [openEditProfile, setOpenEditProfile] = useState(false);

  if (!userData) {
    return <h1 className="text-2xl font-bold text-white">Loading ...</h1>;
  }

  return (
    <>
      <Header title={userData.username} />

      {/* User -  Bannner */}
      <div className="w-full h-[250px] relative">
        {userData.banner ? (
          <Image
            src={userData.banner}
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
            src={userData.img}
            height={120}
            width={120}
            sizes="100%"
            className="rounded-full"
            alt="user image"
          />
        </div>
        <button className="white-btn" onClick={() => setOpenEditProfile(true)}>
          Edit
        </button>
      </div>

      {/* User - Details */}
      <UserInfo userData={userData} />

      {/* Edit - Profile */}
      {openEditProfile ? (
        <EditProfile
          closeBtn={() => setOpenEditProfile(false)}
          userData={userData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyProfile;
