"use client";

import { UserProps } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";

const UserInfo = ({ userData }: { userData?: UserProps }) => {
  const handleCreatedAt = (date: string) => {
    return format(new Date(date), "MMMM yyyy");
  };

  return (
    <>
      {userData && (
        <div className="flex flex-col gap-3 text-white p-4 mt-5 ">
          <div>
            <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
            <p className="text-neutral-500">{userData.username}</p>
          </div>
          <p className="text-lg">{userData.bio}</p>
          <div className="flex items-center gap-1 text-neutral-500">
            <LuCalendarDays size={20} />{" "}
            <span>Joined {handleCreatedAt(userData.createdAt)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>{userData.following.length}</span>
              <p className="text-neutral-500">Following</p>
            </div>
            <div className="flex items-center gap-1">
              <span>{userData.followers.length}</span>
              <p className="text-neutral-500">Followers</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
