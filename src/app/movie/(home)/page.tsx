import { MovieApi } from "@/api";
import Categories from "@/components/categories/Categories";
import ListGenre from "@/components/list-genre/ListGenre";
import CommonList from "@/components/movies/CommonList";
import Slider from "@/components/slider/Slider";
import { CardType } from "@/constants/enum";
import { renderServerError } from "@/utils";
export default async function HomePage() {
  const fetchTrendingMovies = async () => {
    try {
      const res = await MovieApi.getTrendingMovie();
      return res.results;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const res = await MovieApi.getPopularMovie();
      return res.results;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };

  const fetchUpcomingMovies = async () => {
    try {
      const res = await MovieApi.getUpcomingMovie();
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const res = await MovieApi.getTopRatedMovie();
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };

  const fetchListGenres = async () => {
    try {
      const res = await MovieApi.getListGenres();
      return res.genres;
    } catch (error) {
      renderServerError(error);
    }
  };

  const [movies, popularMovies, upcomingMovies, topRatedMovies, genres] =
    await Promise.all([
      fetchTrendingMovies(),
      fetchPopularMovies(),
      fetchUpcomingMovies(),
      fetchTopRatedMovies(),
      fetchListGenres(),
    ]);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col gap-12 col-span-3 lg:col-span-2">
        {movies && <Slider data={movies} type={CardType.MOVIES} />}
        {popularMovies && (
          <CommonList
            type={CardType.MOVIES}
            data={popularMovies}
            genres={genres}
            title="Popular Movies on Honey Movies"
          />
        )}
        <div className="lg:hidden col-start-3 col-span-1 flex flex-col gap-4">
          {upcomingMovies && (
            <CommonList
              type={CardType.MOVIES}
              data={upcomingMovies}
              genres={genres}
              title="Up Coming Movies on Honey Movies"
            />
          )}
          {topRatedMovies && (
            <CommonList
              type={CardType.MOVIES}
              data={topRatedMovies}
              genres={genres}
              title="Top Rated Movies on Honey Movies"
            />
          )}
        </div>
      </div>
      <div className="col-start-3 col-span-1 flex-col gap-4 hidden lg:flex">
        <Categories
          type={CardType.MOVIES}
          title="Up Coming"
          data={upcomingMovies}
          href="/movie/upcoming"
        />
        <Categories
          type={CardType.MOVIES}
          title="Top Rated"
          data={topRatedMovies}
          href="/movie/top-rated"
        />
        <ListGenre genres={genres} title={"Genres"} type={CardType.MOVIES} />
      </div>
      <div className="lg:hidden col-span-3">
        <ListGenre genres={genres} title={"Genres"} type={CardType.MOVIES} />
      </div>
    </div>
  );
}
