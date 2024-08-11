import { CardType } from "@/constants/enum";
import { MovieBase } from "@/types";
import { getImageURL } from "@/utils";
import CardCommon from "../CardCommon";
import { GrCaretNext } from "react-icons/gr";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";

type Props = {
  title: string;
  data: MovieBase[];
  href: string;
  type: string;
};
export default function Categories({ title, data, href, type }: Props) {
  return (
    <div>
      <div className="text-white font-semibold text-lg mb-2">{title}</div>
      <Carousel>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id} className="basis-auto">
              <CardCommon
                id={item.id}
                type={type}
                size="sm"
                img_url={getImageURL("w300", item.poster_path)}
                title={item.title}
                hasMoreInfoButton={true}
                hasWatchButton={true}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-8 left-[80px] xl:left-[140px] h-5 w-8">
          <CarouselPrevious className="bg-transparent -left-7 hidden xl:block" />
          <CarouselNext className="bg-transparent -right-6 hidden xl:block" />
          <Link
            href={href}
            className="absolute text-gray-400 text-sm -right-[80px] xl:-right-[120px] whitespace-nowrap hover:text-primary cursor-pointer flex items-center gap-2"
          >
            <p>See more</p>
          </Link>
        </div>
      </Carousel>
    </div>
  );
}
