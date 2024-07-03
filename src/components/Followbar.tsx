"use client";

import { useAppContext } from "@/context";
import { UserProps } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FollowBar = () => {
  const { newUser, setNewUser } = useAppContext();
  const [users, setUsers] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/user/545181511/infos`, {
        cache: "no-store",
      });
      const data = await res.json();

      console.log("Fetched users:", data); // Add logging
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    console.log(newUser);
  }, [newUser]);

  return (
    <>
      <div className="hidden lg:block bg-neutral-800 h-fit text-white p-2  m-2 rounded-md">
        <h1 className="text-white text-2xl font-semibold mb-3 ml-2">
          Who to Follow
        </h1>
        {users &&
          users.map((user: UserProps, index: number) =>
            user.email !== session?.user?.email ? (
              <div
                className="flex items-center p-2 mb-2 rounded-md cursor-pointer hover:bg-neutral-600"
                key={index}
                onClick={() => router.push(`/profile/${user.username}`)}
              >
                <div className="me-4">
                  <Image
                    src={user.img}
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] rounded-full"
                    alt="user img"
                  />
                </div>
                <div>
                  <h1 className="text-white text-xl">{user.name}</h1>
                  <p className="text-neutral-400">@{user.username}</p>
                </div>
              </div>
            ) : (
              ""
            )
          )}
      </div>
    </>
  );
};

export default FollowBar;
