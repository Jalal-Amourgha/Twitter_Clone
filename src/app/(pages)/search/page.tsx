"use client";

import { useAppContext } from "@/context";
import { UserProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";

const SearchPage = () => {
  const { users, userData } = useAppContext();
  const [search, setSearch] = useState("");
  const [smillarUsers, setSmillarUsers] = useState(users && []);
  const router = useRouter();

  useEffect(() => {
    if (search) {
      setSmillarUsers(
        users.filter(
          (user: UserProps) =>
            user.username.includes(search) || user.name.includes(search)
        )
      );
    } else {
      setSmillarUsers(users);
    }
  }, [search]);

  return (
    <>
      <div className="w-full p-3">
        <input
          type="text"
          className="w-full p-3 border-1 border-white rounded-md text-lg bg-neutral-900 text-white outline-none"
          placeholder="Search user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-10">
        {smillarUsers.map((user: UserProps) => (
          <div
            className="grid grid-cols-[60px_calc(100%-70px)] items-center gap-[10px] p-3 my-2"
            key={user._id}
          >
            <Image
              src={user.img}
              height={50}
              width={50}
              sizes="100%"
              className="rounded-full"
              alt="user image"
            />
            <div className="flex flex-col gap-1 text-neutral-600">
              <h1
                className="text-lg text-white font-semibold hover:text-blue cursor-pointer"
                onClick={() => router.push(`/profile/${user.username}`)}
              >
                {user.name}
              </h1>
              <p>{user.username}</p>
              {user.followers.includes(userData._id) ? (
                <div className="flex items-center gap-1">
                  <FaUser size={15} /> <p>Following</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
