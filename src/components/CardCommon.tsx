import React from "react";
import { Card } from "./ui/card";
import StarRating from "./star/StarRating";
import { Genre } from "@/types";
import { Button } from "./ui/button";
import { ZoomIn } from "lucide-react";
import Link from "next/link";
import { CardType } from "@/constants/enum";

type Props = {
  id: number;
  size: "sm" | "md" | "lg";
  type: string;
  img_url: string;
  genre?: Genre;
  title?: string;
  star?: number;
  release_date?: string;
  hasBlur?: boolean;
  hasWatchButton?: boolean;
  hasMoreInfoButton?: boolean;
  hasRating?: boolean;
};
export default function CardCommon({
  id,
  type,
  size,
  img_url,
  genre,
  title,
  star,
  release_date,
  hasBlur = true,
  hasMoreInfoButton = false,
  hasWatchButton = false,
  hasRating = false,
}: Props) {
  const getRating = () => {
    if (!star) return 0;
    return (star / 2).toFixed(1);
  };
  const getSize = () => {
    if (size === "md") return "w-[237px] h-[298px]";
    if (size === "sm") return "w-[210px] h-[130px]";
    return "w-[195px] md:w-[245px] lg:w-[295px] h-[317px] md:h-[367px] lg:h-[417px]";
  };
  return (
    <Card
      className={`relative ${getSize()} ${
        hasBlur &&
        "before:absolute before:bg-black/40 before:top-0 before:left-0 before:w-full before:h-full"
      } border-none shadow-lg rounded-xl ${size === "lg" && "rounded-b-none"}`}
      style={{
        background: `url(${img_url}) no-repeat center`,
        backgroundSize: "cover",
      }}
    >
      {title && (
        <div className="absolute top-4 left-2 font-semibold text-white">
          {title}
          {star && <StarRating rating={star / 2} />}
        </div>
      )}

      {release_date && (
        <div className="absolute bottom-14 left-2 text-gray-300">
          {release_date}
        </div>
      )}
      {genre && (
        <div className="absolute bottom-14 right-2 text-gray-300">
          {genre.name}
        </div>
      )}
      {hasMoreInfoButton && (
        <Link
          href={`/${type == CardType.MOVIES ? "movie" : "tv-series"}/${id}`}
        >
          <Button
            variant={"outline"}
            className="absolute left-2 bottom-2 text-white font-semibold bg-[#425951] border-none flex gap-2 items-center"
          >
            <ZoomIn />
          </Button>
        </Link>
      )}
      {hasWatchButton && (
        <Link
          href={`/${
            type == CardType.MOVIES ? "movie" : "tv-series"
          }/${id}/watch`}
        >
          <Button
            variant={"primary"}
            className={`absolute bottom-2 right-2 w-[150px] ${
              size === "sm" && "w-fit"
            }`}
          >
            Watch
          </Button>
        </Link>
      )}
      {hasRating && (
        <div className="flex items-center justify-center text-base lg:text-lg font-semibold absolute top-0 right-0 bg-[#F8B319] w-20 h-6 lg:h-10 rounded-tr-xl rounded-bl-xl">
          {getRating()}
        </div>
      )}
    </Card>
  );
}
