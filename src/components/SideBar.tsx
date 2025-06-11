import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiCameraMovie } from "react-icons/bi";
import { FaRegStar, FaRegUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdMovieEdit, MdOutlineLocalMovies } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { RiMovie2Line, RiMovieLine, RiLoginBoxLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MenuItem from "./MenuItem";
import { currentUser } from "@/actions";

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

export default async function SideBar({
  isShowTab = true,
}: {
  isShowTab?: boolean;
}) {
  const user = await currentUser();
  return (
    <div className="w-[235px] pt-12 px-8 fixed top-0 left-0 bottom-0">
      <Link href={"/movie"}>
        <Image
          src={"/images/logo.png"}
          width={176}
          height={74}
          alt="Logo"
          className="mb-8"
        />
      </Link>
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
