import React from "react";
import "../../globals.css";
import BackHome from "@/components/share/BackHome";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-12 pl-8">
      <BackHome />
      {children}
    </div>
  );
}
