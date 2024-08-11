import { MovieApi } from "@/api";
import ListScreen from "@/components/movies/ListScreen";
import { CardType } from "@/constants/enum";
import { Genre } from "@/types";
import { renderServerError } from "@/utils";

export default async function GenresScreen({
  params,
}: {
  params: { genreId: number };
}) {
  const { genreId } = params;
  const fetchMovies = async () => {
    try {
      const res = await MovieApi.getMovieByGenres(genreId);
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
  const [movies, genres] = await Promise.all([
    fetchMovies(),
    fetchListGenres(),
  ]);
  const title = `Genre: ${
    genres.find((item: Genre) => item.id == genreId).name
  }`;
  return (
    <div>
      <ListScreen data={movies} type={CardType.MOVIES} title={title} />
    </div>
  );
}
