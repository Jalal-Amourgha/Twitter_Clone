"use client";

import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { RiNotification4Line } from "react-icons/ri";
import { CiUser, CiBookmark } from "react-icons/ci";
import { IoLogInOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { useAppContext } from "@/context";

const sidebarLinks = [
  {
    href: "/",
    icon: GoHome,
    label: "Home",
  },
  {
    href: "/",
    icon: RiNotification4Line,
    label: "Notification",
  },
  {
    href: "/profile",
    icon: CiUser,
    label: "Profile",
  },
  {
    href: "/",
    icon: CiBookmark,
    label: "Bookmarks",
  },
];

const Sidebar = () => {
  const { setCreateTweet } = useAppContext();
  const { data: session } = useSession();

  return (
    <div className="me-3">
      <Link
        className="text-white flex w-fit  p-4 text-3xl  rounded-full hover:bg-[#e7e9ea1a]"
        href="/"
      >
        <FaXTwitter />
      </Link>
      <div className="mt-2">
        {sidebarLinks.map((link, index) => (
          <Link
            href={link.href}
            className="text-white flex items-center text-3xl mb-4 rounded-full px-4 py-2 w-fit hover:bg-[#e7e9ea1a]"
            key={link.label}
          >
            <link.icon size={28} color="white" />
            <p className="hidden lg:block text-xl ml-4 font-semibold">
              {link.label}
            </p>
          </Link>
        ))}
        {session?.user?.email ? (
          <button
            className="flex items-center text-white text-3xl rounded-full px-4 
        py-2 hover:bg-[#e7e9ea1a]"
            onClick={() => signOut()}
          >
            <IoLogInOutline />
            <p className="hidden lg:block text-xl font-semibold ml-4">
              Log out
            </p>
          </button>
        ) : (
          ""
        )}

        <button
          className="blue-btn w-full mt-10"
          onClick={() => setCreateTweet(true)}
        >
          Create Tweet
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
