import { DetailContent } from "@/types";
import { getImageURL } from "@/utils";
import React from "react";
import BackHome from "../share/BackHome";
import StarRating from "../star/StarRating";
import { FaImdb } from "react-icons/fa";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";
import { CardType } from "@/constants/enum";

type Props = {
  data: DetailContent;
  type: string;
};
export default function DetailPage({ data, type }: Props) {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden text-sm lg:text-base bg-no-repeat bg-cover bg-center py-[180px] px-[80px] before:absolute before:bg-black/30 before:top-0 before:left-0 before:w-full before:h-full"
      style={{
        backgroundImage: `url(${getImageURL("original", data.backdrop_path)})`,
      }}
    >
      <div className="absolute top-[5%] md:top-[18%] xl:top-[20%] right-4 left-[5%] xl:left-[10%] ">
        <BackHome />
        <div className="grid gap-2 md:gap-8 lg:gap-[50px] xl:gap-[100px] grid-rows-2 grid-cols-3 text-white mt-12 ml-8">
          <div className="flex flex-col gap-4 col-span-3 row-start-2 md:row-start-1 md:col-span-2">
            <div className="font-semibold text-2xl lg:text-4xl">
              {type == CardType.MOVIES ? data.title : data.name}
            </div>
            <div>
              <StarRating rating={data.vote_average / 2} />
            </div>
            <div className="p-1 bg-destructive w-fit rounded-md text-sm">{`${data.status}`}</div>
            <div className="flex gap-2 items-center">
              <Image
                src={"/images/IMDB_Logo.png"}
                width={48}
                height={32}
                alt="logo"
              />
              <div>{data.vote_average.toFixed(1)}</div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="w-full max-h-[150px] overflow-hidden text-ellipsis line-clamp-6 text-left">
                    {data.overview}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{data.overview}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Link
              href={`/${type == CardType.MOVIES ? "movie" : "tv-series"}/${
                data.id
              }/watch`}
              className="ml-auto mt-4"
            >
              <Button variant={"primary"} className="w-fit">
                Watch Now
              </Button>
            </Link>
          </div>
          <Link
            href={`/${type == CardType.MOVIES ? "movie" : "tv-series"}/${
              data.id
            }/watch`}
          >
            <div
              className="relative w-[200px] lg:w-[250px] xl:w-[300px] h-[300px] lg:h-[350px] xl:h-[400px] rounded-t-2xl row-start-1 col-span-3 md:col-span-1 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${getImageURL(
                  "original",
                  data.poster_path
                )})`,
              }}
            >
              <div className="absolute w-fit top-0 right-0 py-1 px-6 bg-primary text-black text-sm rounded-bl-xl rounded-tr-xl">
                {data.genres[0].name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
