"use client";
import React from "react";
import BackHome from "@/components/share/BackHome";
export default function ErrorPage() {
  return (
    <div className="text-white flex items-center h-screen justify-center">
      <div className="flex flex-col gap-8 text-lg">
        No content was found.
        <BackHome />
      </div>
    </div>
  );
}
