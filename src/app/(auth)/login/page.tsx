import CardWrapper from "@/components/auth/CardWrapper";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-full bg-black/60">
      <CardWrapper
        title="Wellcome back!"
        titleFooter="Back to home page"
        hrefFooter="/"
      />
    </div>
  );
}
