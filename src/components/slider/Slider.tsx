import { CardType } from "@/constants/enum";
import { TVSeriesAndMovies } from "@/types";
import { getImageURL } from "@/utils";
import { ZoomIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

type Props = {
  data: TVSeriesAndMovies[];
  type: CardType;
};

export default async function Slider({ data, type }: Props) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem
            key={item.id}
            className="relative flex justify-center w-full h-[350px]"
          >
            <Image
              src={getImageURL("original", item.backdrop_path)}
              width={1400}
              height={350}
              placeholder="blur"
              blurDataURL="/images/default-image.jpg"
              alt="banner"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <div className="absolute top-10 left-12 text-white font-semibold text-2xl">
              {type === CardType.MOVIES ? item.title : item.name}
            </div>
            <Link
              href={`/${type === CardType.MOVIES ? "movie" : "tv-series"}/${
                item.id
              }`}
            >
              <Button
                variant={"outline"}
                className="absolute left-8 bottom-4 text-white font-semibold bg-[#425951] border-none flex gap-2 items-center"
              >
                <ZoomIn />
                More info
              </Button>
            </Link>
            <Link
              href={`/${type === CardType.MOVIES ? "movie" : "tv-series"}/${
                item.id
              }/watch`}
            >
              <Button variant={"primary"} className="absolute bottom-4 right-4">
                Watch Now
              </Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
