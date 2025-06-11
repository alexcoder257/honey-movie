import React from "react";
import { MovieApi } from "@/api";
import DetailPage from "@/components/detail/DetailPage";
import { CardType } from "@/constants/enum";
import { renderServerError } from "@/utils";

export default async function DetailMovie({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = params;
  const fetchDetail = async () => {
    try {
      const res = await MovieApi.getDetailMovie(Number(movieId));
      return res;
    } catch (error) {
      renderServerError(error);
    }
  };
  const movieDetail = await fetchDetail();
  return (
    <div>
      {movieDetail && <DetailPage data={movieDetail} type={CardType.MOVIES} />}
    </div>
  );
}
