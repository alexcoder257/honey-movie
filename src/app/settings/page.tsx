"use client";
import { Fragment } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LuPencilLine } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function SettingPage() {
  const user = useCurrentUser();

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <div className="p-4 md:p-12 flex gap-8 text-white items-center w-full">
      {user ? (
        <Fragment>
          <Image
            src={user?.image as string}
            width={150}
            height={150}
            alt="avatar"
            style={{
              borderRadius: "50%",
              objectFit: "contain",
            }}
          />
          <div className="flex flex-col gap-2">
            <div>
              <div className="flex gap-2 items-center">
                {user?.name}
                <LuPencilLine />
              </div>
              <div className="text-gray-400 col-start-2 col-span-2">
                {user?.email}
              </div>
            </div>
            <Button variant={"primary"} size={"lg"} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Fragment>
      ) : (
        <div>No information was found!</div>
      )}
    </div>
  );
}
