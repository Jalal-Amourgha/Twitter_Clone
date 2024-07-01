"use client";

import { FaArrowLeft } from "react-icons/fa6";
import { useAppContext } from "@/context";
import Image from "next/image";
import UserInfo from "@/components/UserInfo";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditProfile from "@/components/EditProfile";

const UserPosts = dynamic(() => import("@/components/UserPosts"), {
  ssr: false,
});

const MyProfile = () => {
  const { reFetchUsers } = useAppContext();
  const [userData, setUserData] = useState<any>("");
  const [editProfile, setEditProfile] = useState(false);
  const { data: session } = useSession();

  const fetchUserData = async (userId: String) => {
    const data = await fetch(`/api/user/${userId}/infos`);
    const res = await data.json();

    return setUserData(res);
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserData(session?.user?.email as string);
    }
  }, [session?.user?.email, reFetchUsers]);

  if (!userData) {
    return <h1 className="text-2xl font-bold text-white">Loading ...</h1>;
  }

  return (
    <>
      <Header title={userData && userData.username} />

      {/* User - Banner */}
      <div className="w-full h-[250px] relative">
        {userData && userData.banner ? (
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
            src={userData && userData.img}
            height={120}
            width={120}
            sizes="100%"
            className="rounded-full"
            alt="user image"
          />
        </div>
        <button className="white-btn" onClick={() => setEditProfile(true)}>
          Edit
        </button>
      </div>

      {/* User - Info - Details */}
      {userData && <UserInfo userData={userData} />}

      {/* User - Posts - Replies - Likes */}
      {userData && <UserPosts userId={userData._id} />}

      {editProfile ? (
        <EditProfile
          userData={userData}
          closeBtn={() => setEditProfile(false)}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyProfile;
