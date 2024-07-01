"use client";
import { useAppContext } from "@/context";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const UserIcon = () => {
  const { userData } = useAppContext();
  const [showProps, setShowProps] = useState(false);

  return (
    <>
      {userData && (
        <div
          className={`${
            userData.name ? "" : "hidden"
          } p-2 mx-2 flex flex-row justify-between items-center rounded-full text-white hover:bg-[#e7e9ea1a] relative cursor-pointer mb-3`}
        >
          <div className="flex items-center gap-3">
            <div>
              <Image
                src={userData.img}
                height={50}
                width={50}
                className="rounded-full"
                alt="user img"
              />
            </div>
            <div>
              <h1 className="font-semibold text-xl line-clamp-1">
                {userData.name}
              </h1>
              <p className="text-gray-500 line-clamp-1">{userData.username}</p>
            </div>
          </div>
          {showProps ? (
            <div className="absolute top-[-93px] bg-black z-10 right-0 w-[200px] p-2 border-1 border-white text-white text-lg  rounded-lg">
              <p className="p-2  hover:bg-[#e7e9ea1a] rounded-md">
                View Profile
              </p>
              <p className="p-2 hover:bg-[#e7e9ea1a] rounded-md">Sign out</p>
            </div>
          ) : (
            ""
          )}
          <BsThreeDots size={24} onClick={() => setShowProps(!showProps)} />
        </div>
      )}
    </>
  );
};

export default UserIcon;
