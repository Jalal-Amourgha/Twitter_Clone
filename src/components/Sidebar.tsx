"use client";

import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import {
  GoHome,
  GoHomeFill,
  GoBookmark,
  GoBookmarkFill,
  GoSearch,
} from "react-icons/go";
import { RiUser3Line, RiUserFill } from "react-icons/ri";

import { IoLogInOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { useAppContext } from "@/context";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  {
    href: "/",
    icon1: <GoHome />,
    icon2: <GoHomeFill />,
    label: "Home",
  },
  {
    href: "/search",
    icon1: <GoSearch />,
    icon2: <GoSearch />,
    label: "Search",
  },
  {
    href: "/profile",
    icon1: <RiUser3Line />,
    icon2: <RiUserFill />,
    label: "Profile",
  },
  {
    href: "/bookmarks",
    icon1: <GoBookmark />,
    icon2: <GoBookmarkFill />,
    label: "Bookmarks",
  },
];

export const Sidebar = () => {
  const { setCreateTweet } = useAppContext();
  const { data: session } = useSession();
  const pathname = usePathname();

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
            <div className="text-2xl">
              {pathname === link.href ? link.icon2 : link.icon1}
            </div>
            <p className="hidden lg:block text-xl ml-4 font-normal">
              {link.label}
            </p>
          </Link>
        ))}
        {session?.user?.email ? (
          <button
            className="flex items-center text-white text-3xl rounded-full px-2 
        py-2 hover:bg-[#e7e9ea1a] "
            onClick={() => signOut()}
          >
            <IoLogInOutline />
            <p className="hidden lg:block text-xl font-normal ml-4">Log out</p>
          </button>
        ) : (
          ""
        )}

        <button
          className="hidden lg:block blue-btn w-full mt-10"
          onClick={() => setCreateTweet(true)}
        >
          Create Tweet
        </button>
      </div>
    </div>
  );
};

export const MobileSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden w-full bg-black fixed bottom-0 left-0 z-50 py-4 flex items-center justify-between ">
      {sidebarLinks.map((item) => (
        <Link
          href={item.href}
          className="text-white text-xl cursor-pointer"
          key={item.label}
        >
          {item.href === pathname ? item.icon2 : item.icon1}
        </Link>
      ))}
    </div>
  );
};
