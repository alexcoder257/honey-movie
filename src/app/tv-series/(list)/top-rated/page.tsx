import { TVSeriesApi } from "@/api";
import ListScreen from "@/components/movies/ListScreen";
import { CardType } from "@/constants/enum";
import { renderServerError } from "@/utils";

export default async function OnTheAirTV() {
  const fetchData = async () => {
    try {
      const res = await TVSeriesApi.getTopRatedTV();
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };
  const tvSeries = await fetchData();
  return (
    <div>
      <ListScreen
        data={tvSeries}
        type={CardType.TV_SERIES}
        title="Top Rated TV Series on Honey Movies"
      />
    </div>
  );
}
