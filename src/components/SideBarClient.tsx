"use client";

import Image from "next/image";
import { BiCameraMovie } from "react-icons/bi";
import { MdMovieEdit, MdOutlineLocalMovies } from "react-icons/md";
import { RiMovie2Line, RiMovieLine } from "react-icons/ri";
import MenuItem from "./MenuItem";
import { PiTelevision } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { currentUser } from "@/actions";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { RiLoginBoxLine } from "react-icons/ri";
import { Fragment } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "./ui/button";

const movies = [
  {
    icon: <MdMovieEdit size="lg" />,
    name: "Now Playing",
    href: "/movie/now-playing",
  },
  {
    icon: <RiMovie2Line size="lg" />,
    name: "Popular",
    href: "/movie/popular",
  },
  {
    icon: <MdOutlineLocalMovies size="lg" />,
    name: "Top Rated",
    href: "/movie/top-rated",
  },
  {
    icon: <RiMovieLine size="lg" />,
    name: "Upcoming",
    href: "/movie/upcoming",
  },
];

const tvSeries = [
  {
    icon: <BiCameraMovie size="lg" />,
    name: "Airing Today",
    href: "/tv-series/airing-today",
  },
  {
    icon: <PiTelevision size="lg" />,
    name: "On The Air",
    href: "/tv-series/on-the-air",
  },
  {
    icon: <FaEarthAmericas size="lg" />,
    name: "Popular",
    href: "/tv-series/popular",
  },
  {
    icon: <FaRegStar size="lg" />,
    name: "Top Rated",
    href: "/tv-series/top-rated",
  },
];

export default function SideBarClient({
  isShowTab = true,
}: {
  isShowTab?: boolean;
}) {
  const user = useCurrentUser();
  return (
    <div className="w-[200px] text-sm sm:text-base sm:w-[400px] h-[600px] py-4 sm:py-8 px-4 sm:px-8 bg-gray-900/90 overflow-y-scroll">
      <div className="sm:hidden flex flex-col gap-2 p-4 bg-black/30 rounded-lg mb-4">
        <Link href={"/movie"}>
          <Button variant={"primary"} className="w-full">
            Movie
          </Button>
        </Link>
        <Link href={"/tv-series"}>
          <Button variant={"primary"} className="w-full">
            TV Series
          </Button>
        </Link>
      </div>
      {isShowTab && (
        <div className="flex flex-col gap-12">
          <MenuItem data={movies} title="Movies" />
          <MenuItem data={tvSeries} title="TV Series" />
        </div>
      )}
      <div className="mt-8 lg:hidden">
        <div className="text-lg font-semibold text-gray-400">General</div>
        {user ? (
          <Fragment>
            <Link
              href={"/settings"}
              className="text-white hover:text-primary flex gap-2 mt-8"
            >
              <div className="w-6 h-6">
                <IoSettingsOutline size="lg" />
              </div>
              Settings
            </Link>
            <div className="flex gap-2 items-center mt-8">
              <Avatar>
                <AvatarImage src={user?.image || undefined} />
                <AvatarFallback>
                  <FaRegUser />
                </AvatarFallback>
              </Avatar>
              <div className="text-primary font-semibold flex gap-2 items-center">
                {user?.name}
              </div>
            </div>
          </Fragment>
        ) : (
          <Link
            href={"/login"}
            className="text-white hover:text-primary flex gap-2 mt-8"
          >
            <div className="w-6 h-6">
              <RiLoginBoxLine size="lg" />
            </div>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
