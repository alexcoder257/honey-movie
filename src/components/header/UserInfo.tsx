"use client";

import { Fragment, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLoginBoxLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function UserInfo() {
  const [dropdownToggle, setDropdownToggle] = useState(true);

  const user = useCurrentUser();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex gap-4 items-center">
      {user ? (
        <Fragment>
          <Link href="/settings">
            <div className="w-10 h-10 bg-[#3F4446] p-2 rounded-sm cursor-pointer text-white hover:text-primary">
              <IoSettingsOutline size="lg" />
            </div>
          </Link>
          <DropdownMenu onOpenChange={() => setDropdownToggle((prev) => !prev)}>
            <DropdownMenuTrigger>
              <div className="text-primary font-semibold flex gap-2 items-center">
                {user?.name}
                {dropdownToggle ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2">
              <DropdownMenuLabel
                className="flex gap-2 cursor-pointer items-center"
                onClick={handleLogout}
              >
                <TbLogout2 className="w-4 h-4" />
                <div className="leading-3">Logout</div>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      ) : (
        <Link href={"/login"}>
          <div className="text-white hover:text-primary flex gap-2">
            <div className="w-6 h-6">
              <RiLoginBoxLine size="lg" />
            </div>
            Login
          </div>
        </Link>
      )}
      <div>
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>
            <FaRegUser />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
