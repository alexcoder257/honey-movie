import { MovieApi } from "@/api";
import ListScreen from "@/components/movies/ListScreen";
import { CardType } from "@/constants/enum";
import { renderServerError } from "@/utils";

export default async function NowPlayingMovies() {
  const fetchNowPlayingMovie = async () => {
    try {
      const res = await MovieApi.getNowPlayingMovie();
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };
  const movies = await fetchNowPlayingMovie();
  return (
    <div>
      <ListScreen
        data={movies}
        type={CardType.MOVIES}
        title="Now Playing on Honey Movies"
      />
    </div>
  );
}
