import { MovieApi, TVSeriesApi } from "@/api";
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
  const fetchTVSeries = async () => {
    try {
      const res = await TVSeriesApi.getTVByGenres(genreId);
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
  const [tvSeries, genres] = await Promise.all([
    fetchTVSeries(),
    fetchListGenres(),
  ]);
  const title = `Genre: ${
    genres.find((item: Genre) => item.id == genreId).name
  }`;
  return (
    <div>
      <ListScreen data={tvSeries} type={CardType.TV_SERIES} title={title} />
    </div>
  );
}
