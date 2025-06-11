import { TVSeriesAndMovies } from "@/types";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CardCommon from "../CardCommon";
import { CardType } from "@/constants/enum";
import { getImageURL } from "@/utils";
import StarRating from "../star/StarRating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  data: TVSeriesAndMovies[];
  title: string;
  type: CardType;
};

export default function ListScreen({ data, title, type }: Props) {
  return (
    <div className="text-white">
      <div className="text-xl lg:text-3xl font-semibold py-12">{title}</div>
      <Carousel>
        <CarouselContent className="flex gap-4">
          {data.map((item) => (
            <CarouselItem key={item.id} className="basis-auto">
              <div className="flex flex-col gap-4 items-start w-[195px] md:w-[245px] lg:w-[295px] text-sm lg:text-base">
                <Link
                  href={`/${type === CardType.MOVIES ? "movie" : "tv-series"}/${
                    item.id
                  }`}
                >
                  <CardCommon
                    id={item.id}
                    type={type}
                    size="lg"
                    star={item.vote_average}
                    img_url={getImageURL("w300", item.poster_path)}
                    hasRating={true}
                    hasBlur={false}
                  />
                </Link>
                <div className="font-semibold text-xl">
                  {type === CardType.MOVIES ? item.title : item.name}
                </div>
                <StarRating rating={item.vote_average / 2} />
                <div className="text-gray-400">{item.release_date}</div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="w-full max-h-[100px] overflow-hidden text-ellipsis line-clamp-4 text-left">
                        {item.overview}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>{item.overview}</div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 lg:mt-8 flex justify-center gap-4 items-center text-lg ">
        <div>Swipe</div>
        <ChevronRight />
      </div>
    </div>
  );
}
