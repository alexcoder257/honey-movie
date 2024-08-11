import SideBar from "@/components/SideBar";
import HeaderBar from "@/components/header/HeaderBar";
import React from "react";

export default function DetailMovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
