"use client";

import { CardType } from "@/constants/enum";
import { TVSeriesAndMovies } from "@/types";
import { getImageURL } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: TVSeriesAndMovies[];
  type: string;
};

export default function SearchedList({ data, type }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <Link
          key={item.id}
          href={
            type === CardType.MOVIES
              ? `/movie/${item.id}`
              : `/tv-series/${item.id}`
          }
        >
          <div className="flex gap-4 border-b-2 border-b-gray-800 border-solid p-4 text-white hover:text-primary">
            <Image
              src={getImageURL("w200", item.poster_path)}
              width={100}
              height={150}
              alt="img"
              placeholder="blur"
              blurDataURL="/images/default-image.jpg"
            />
            <div className="flex-1 flex flex-col gap-2 items-center text-center">
              <div className="text-lg">
                {type === CardType.MOVIES ? item.title : item.name}
              </div>
              <div className="text-gray-400">
                {type === CardType.MOVIES
                  ? item.release_date
                  : item.first_air_date}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
