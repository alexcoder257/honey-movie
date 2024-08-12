import { MovieApi } from "@/api";
import WatchScreen from "@/components/movies/WatchPage";
import { CardType } from "@/constants/enum";
import { getVideoUrl, renderServerError } from "@/utils";

export default async function WatchPage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;
  const fetchUrl = async () => {
    try {
      const res = await MovieApi.getUrlMovie(Number(movieId));
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };
  const fetchSimilarMovie = async () => {
    try {
      const res = await MovieApi.getSimilarMovie(Number(movieId));
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };

  const [urlKey, similarMovies] = await Promise.all([
    fetchUrl(),
    fetchSimilarMovie(),
  ]);

  const getURLpath = () => {
    return urlKey?.length ? getVideoUrl(urlKey[0].key) : "";
  };
  const url = getURLpath();
  return <WatchScreen url={url} data={similarMovies} type={CardType.MOVIES} />;
}
