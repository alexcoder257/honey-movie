import { TVSeriesApi } from "@/api";
import DetailPage from "@/components/detail/DetailPage";
import { CardType } from "@/constants/enum";
import { renderServerError } from "@/utils";

export default async function DetailMovie({
  params,
}: {
  params: { tvSeriesId: string };
}) {
  const { tvSeriesId } = params;
  const fetchDetail = async () => {
    try {
      const res = await TVSeriesApi.getDetailTVSerie(tvSeriesId);
      return res;
    } catch (error) {
      renderServerError(error);
    }
  };
  const tvSeriesDetail = await fetchDetail();
  return (
    <div>
      {tvSeriesDetail && (
        <DetailPage data={tvSeriesDetail} type={CardType.TV_SERIES} />
      )}
    </div>
  );
}
