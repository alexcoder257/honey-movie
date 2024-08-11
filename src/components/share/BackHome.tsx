import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BackHome() {
  return (
    <Link
      href={"/movie"}
      className="flex gap-4 hover:text-primary text-white items-center"
    >
      <div className="p-2 rounded-lg bg-[#5F5847] flex items-center justify-center">
        <ChevronLeft size={32} />
      </div>
      <div className="font-semibold text-lg lg:text-xl">Back home</div>
    </Link>
  );
}
