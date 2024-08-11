import { MovieApi, TVSeriesApi } from "@/api";
import VideoPlayer from "@/components/detail/VideoPlayer";
import HeaderBar from "@/components/header/HeaderBar";
import CommonList from "@/components/movies/CommonList";
import { CardType } from "@/constants/enum";
import { getVideoUrl, renderServerError } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <div className="h-screen flex flex-col justify-end">
      <div className="fixed top-0 left-0 w-screen flex items-center gap-12 px-4 lg:px-12 pt-12">
        <Link href={"/movie"} className="hidden md:block">
          <Image src={"/images/logo.png"} width={176} height={74} alt="Logo" />
        </Link>
        <div className="flex-1">
          <HeaderBar />
        </div>
      </div>
      <div
        className="pb-12 overflow-y-auto"
        style={{
          height: "calc(100% - 120px)",
        }}
      >
        <div className="flex justify-center bg-black/70 w-screen">
          {url ? (
            <VideoPlayer url={url} />
          ) : (
            <div className="w-[980px] h-[550px] text-white flex items-center justify-center">
              No video was found!
            </div>
          )}
        </div>
        <div className="mt-12 px-4 lg:px-12">
          {similarTvSeries && (
            <CommonList
              data={similarTvSeries}
              title="Similar Tv Series"
              type={CardType.TV_SERIES}
            />
          )}
        </div>
      </div>
    </div>
  );
}
