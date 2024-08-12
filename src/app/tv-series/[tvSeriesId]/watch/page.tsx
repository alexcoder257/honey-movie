import { TVSeriesApi } from "@/api";
import WatchScreen from "@/components/movies/WatchPage";
import { CardType } from "@/constants/enum";
import { getVideoUrl, renderServerError } from "@/utils";

export default async function WatchPage({
  params,
}: {
  params: { tvSeriesId: string };
}) {
  const { tvSeriesId } = params;
  const fetchUrl = async () => {
    try {
      const res = await TVSeriesApi.getUrlTV(Number(tvSeriesId));
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };
  const fetchSimilarTVSeries = async () => {
    try {
      const res = await TVSeriesApi.getSimilarTV(Number(tvSeriesId));
      return res.results;
    } catch (error) {
      renderServerError(error);
    }
  };

  const [urlKey, similarTvSeries] = await Promise.all([
    fetchUrl(),
    fetchSimilarTVSeries(),
  ]);

  const getURLpath = () => {
    return urlKey?.length ? getVideoUrl(urlKey[0].key) : "";
  };
  const url = getURLpath();
  return (
    <WatchScreen url={url} data={similarTvSeries} type={CardType.TV_SERIES} />
  );
}
