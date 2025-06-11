import { Genre } from "@/types";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import { CardType } from "@/constants/enum";

type Props = {
  genres: Genre[];
  title: string;
  type: CardType;
};

export default function ListGenre({ genres, title, type }: Props) {
  return (
    <div className="mt-6 pr-2">
      <div className="text-white font-semibold text-lg mb-2">{title}</div>
      <Carousel
        orientation="vertical"
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent className="max-h-[300px]">
          {genres.map((item) => (
            <Link
              key={item.id}
              href={`/${
                type === CardType.MOVIES ? "movie" : "tv-series"
              }/genres/${item.id}`}
            >
              <CarouselItem>
                <Card className="p-4 flex items-center justify-center bg-honey text-primary border-primary">
                  {item.name}
                </Card>
              </CarouselItem>
            </Link>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent " />
        <CarouselNext className="bg-transparent " />
      </Carousel>
    </div>
  );
}
