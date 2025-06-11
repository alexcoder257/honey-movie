"use client";

import { MovieApi, TVSeriesApi } from "@/api";
import { CardType } from "@/constants/enum";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { TVSeriesAndMovies } from "@/types";
import { renderServerError } from "@/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SideBarClient from "../SideBarClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import SearchedList from "./SearchedList";

export default function SearchBar() {
  const [data, setData] = useState<TVSeriesAndMovies[]>([]);
  const [keyword, setKeyWord] = useState("");
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [progress, setProgress] = useState(0);

  const pathname = usePathname();
  const isMovieScreen = pathname.includes("/movie");
  const debounced = useDebounceCallback(setKeyWord, 500);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setIsShowDropdown(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    let ignore = false;
    let progressInterval: NodeJS.Timeout;
    const fetchListSearch = async () => {
      setFetching(true);
      setProgress(0);
      // Simulate progress
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            // Stop updating before completing
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10; // Adjust increment for simulation
        });
      }, 200); // Adjust interval as needed
      try {
        const res = isMovieScreen
          ? await MovieApi.searchMovie(keyword)
          : await TVSeriesApi.searchTVSeries(keyword);
        if (!ignore) {
          setData(res.results);
        }
      } catch (error) {
        renderServerError(error);
      } finally {
        setProgress(100);
        setFetching(false);
        clearInterval(progressInterval);
      }
    };

    if (keyword !== "") {
      fetchListSearch();
    } else {
      setData([]);
    }

    return () => {
      ignore = true;
      clearInterval(progressInterval);
    };
  }, [keyword, isMovieScreen]);

  return (
    <div className="flex gap-4 items-center col-span-3 sm:col-span-2 lg:col-span-1">
      <div
        ref={ref}
        className="relative bg-[#21242D] text-gray-400 w-full h-[48px] rounded-lg flex gap-2 items-center "
      >
        <IoIosSearch className="w-5 h-5 absolute left-4 top-50%" />
        <Input
          onFocus={() => setIsShowDropdown(true)}
          onChange={(e) => debounced(e.target.value)}
          placeholder="Search"
          className="bg-inherit h-full w-full border-none focus:border-primary border-2 focus:border-solid  pl-12"
        />

        <div className="absolute left-0 w-full top-[60px] z-[99] bg-gray-900/90 max-h-[500px] rounded-lg overflow-y-auto text-white">
          <RenderContent
            isFetching={isFetching}
            progress={progress}
            data={data}
            keyword={keyword}
            isShowDropdown={isShowDropdown}
            isMovieScreen={isMovieScreen}
          />
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <DropdownMenu onOpenChange={() => setIsShowDropdown(false)}>
          <DropdownMenuTrigger>
            <div className="bg-primary min-w-6 min-h-6 rounded-full p-2">
              <Image
                src={"/images/logo-icon.png"}
                width={32}
                height={32}
                alt="logo"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="mt-2 border-none outline-none w-full"
          >
            <SideBarClient />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

type Props = {
  isFetching: boolean;
  data: TVSeriesAndMovies[];
  progress: number;
  isShowDropdown: boolean;
  isMovieScreen: boolean;
  keyword: string;
};

function RenderContent({
  isFetching,
  data,
  progress,
  isShowDropdown,
  isMovieScreen,
  keyword,
}: Props) {
  if (isFetching) {
    return (
      <div className="p-4 pb-6 flex flex-col gap-2 bg-gray-900">
        <div>Loading...</div>
        <Progress value={progress} max={100} />
      </div>
    );
  }
  if (data.length) {
    return (
      isShowDropdown && (
        <SearchedList
          data={data}
          type={isMovieScreen ? CardType.MOVIES : CardType.TV_SERIES}
        />
      )
    );
  } else if (keyword) {
    return <div className="p-4 bg-gray-900">No content was found.</div>;
  }
}
