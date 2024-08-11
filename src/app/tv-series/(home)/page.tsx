import { TVSeriesApi } from "@/api";
import Categories from "@/components/categories/Categories";
import ListGenre from "@/components/list-genre/ListGenre";
import CommonList from "@/components/movies/CommonList";
import Slider from "@/components/slider/Slider";
import { CardType } from "@/constants/enum";
import { renderServerError } from "@/utils";
export default async function HomePage() {
  const fetchTrendingTV = async () => {
    try {
      const res = await TVSeriesApi.getTrendingTV();
      return res.results;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };

  const fetchPopularTV = async () => {
    try {
      const res = await TVSeriesApi.getPopularTV();
      return res.results;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };

  const fetchOnTheAirTV = async () => {
    try {
      const res = await TVSeriesApi.getOnTheAirTV();
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };

  const fetchTopRatedTV = async () => {
    try {
      const res = await TVSeriesApi.getTopRatedTV();
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };

  const fetchListGenres = async () => {
    try {
      const res = await TVSeriesApi.getListTVGenres();
      return res.genres;
    } catch (error) {
      renderServerError(error);
    }
  };

  const [
    tvSeries,
    popularTVSeries,
    onTheAirTVSeries,
    topRatedTVSeries,
    genres,
  ] = await Promise.all([
    fetchTrendingTV(),
    fetchPopularTV(),
    fetchOnTheAirTV(),
    fetchTopRatedTV(),
    fetchListGenres(),
  ]);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col gap-12 col-span-3 lg:col-span-2">
        {tvSeries && <Slider data={tvSeries} type={CardType.TV_SERIES} />}
        {popularTVSeries && (
          <CommonList
            type={CardType.TV_SERIES}
            data={popularTVSeries}
            genres={genres}
            title="Popular TV Series on Honey Movies"
          />
        )}
        <div className="lg:hidden col-start-3 col-span-1 flex flex-col gap-4">
          {onTheAirTVSeries && (
            <CommonList
              type={CardType.TV_SERIES}
              data={onTheAirTVSeries}
              genres={genres}
              title="On The Air TV Series on Honey Movies"
            />
          )}
          {topRatedTVSeries && (
            <CommonList
              type={CardType.TV_SERIES}
              data={topRatedTVSeries}
              genres={genres}
              title="Top Rated TV Series on Honey Movies"
            />
          )}
        </div>
      </div>
      <div className="col-start-3 col-span-1 flex-col gap-4 hidden lg:flex">
        {onTheAirTVSeries && (
          <Categories
            type={CardType.TV_SERIES}
            title="On The Air"
            data={onTheAirTVSeries}
            href="/tv-series/on-the-air"
          />
        )}
        {topRatedTVSeries && (
          <Categories
            type={CardType.TV_SERIES}
            title="Top Rated"
            data={topRatedTVSeries}
            href="/tv-series/top-rated"
          />
        )}
        <ListGenre genres={genres} title={"Genres"} type={CardType.TV_SERIES} />
      </div>
      <div className="lg:hidden col-span-3">
        <ListGenre genres={genres} title={"Genres"} type={CardType.MOVIES} />
      </div>
    </div>
  );
}
