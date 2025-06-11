import { CardType } from "@/constants/enum";
import { Genre, TVSeriesAndMovies } from "@/types";
import { getGenre, getImageURL } from "@/utils";
import CardCommon from "../CardCommon";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

type Props = {
  data: TVSeriesAndMovies[];
  genres?: Genre[];
  title: string;
  type: CardType;
};
export default function CommonList({ data, genres = [], title, type }: Props) {
  return (
    <div>
      <div className="text-2xl text-white font-semibold mb-4">{title}</div>
      <Carousel>
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem key={item.id} className="basis-auto">
              <CardCommon
                id={item.id}
                type={type}
                size="md"
                star={item.vote_average}
                img_url={getImageURL("w300", item.poster_path)}
                title={type === CardType.MOVIES ? item.title : item.name}
                hasMoreInfoButton={true}
                hasWatchButton={true}
                release_date={
                  type === CardType.MOVIES
                    ? item.release_date
                    : item.first_air_date
                }
                genre={getGenre(item, genres)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
