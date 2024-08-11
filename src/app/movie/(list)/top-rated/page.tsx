import { MovieApi } from "@/api";
import ListScreen from "@/components/movies/ListScreen";
import { CardType } from "@/constants/enum";
import { renderServerError } from "@/utils";

export default async function TopRatedMovies() {
  const fetchData = async () => {
    try {
      const res = await MovieApi.getTopRatedMovie();
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };
  const movies = await fetchData();
  return (
    <div>
      <ListScreen
        data={movies}
        type={CardType.MOVIES}
        title="Top Rated on Honey Movies"
      />
    </div>
  );
}
