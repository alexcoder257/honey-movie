import { TVSeriesAndMovies } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeaderBar from "../header/HeaderBar";
import VideoPlayer from "../detail/VideoPlayer";
import CommonList from "./CommonList";
import { CardType } from "@/constants/enum";

type Props = {
  data: TVSeriesAndMovies[];
  url: string;
  type: CardType;
};

export default function WatchScreen({ data, url, type }: Props) {
  return (
    <div className="h-screen flex flex-col justify-end overflow-hidden">
      <div className="fixed top-0 left-0 w-screen flex items-center gap-12 px-4 lg:px-12 pt-12">
        <Link href={"/movie"} className="hidden md:block">
          <Image src={"/images/logo.png"} width={176} height={74} alt="Logo" />
        </Link>
        <div className="flex-1">
          <HeaderBar />
        </div>
      </div>
      <div
        className="pb-12 overflow-y-auto overflow-x-hidden"
        style={{
          height: "calc(100% - 120px)",
        }}
      >
        <div className="flex justify-center bg-black/70 w-screen">
          {url ? (
            <VideoPlayer url={url} />
          ) : (
            <div className="w-[980px] h-[550px] text-white flex items-center justify-center">
              No video was found!
            </div>
          )}
        </div>
        <div className="mt-12 px-4 lg:px-12">
          <CommonList
            data={data}
            title={
              type === CardType.MOVIES ? "Similar Movies" : "Similar TV Series"
            }
            type={type}
          />
        </div>
      </div>
    </div>
  );
}
