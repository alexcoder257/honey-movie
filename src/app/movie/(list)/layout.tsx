import React from "react";
import "../../globals.css";
import BackHome from "@/components/share/BackHome";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { movieId?: string };
}) {
  const { movieId } = params;
  return (
    <div className={`${movieId ? "" : "py-12 pl-8"}`}>
      <BackHome />
      {children}
    </div>
  );
}
