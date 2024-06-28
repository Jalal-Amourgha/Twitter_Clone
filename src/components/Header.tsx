"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div
      className="h-10 w-full px-4 py-8 border-b-1 border-neutral-800  flex items-center gap-4 text-white cursor-pointer"
      onClick={() => router.back()}
    >
      <FaArrowLeftLong size={20} />{" "}
      <span className="text-2xl font-bold">{title}</span>
    </div>
  );
};
