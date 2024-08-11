import React from "react";

export default function VideoPlayer({ url }: { url: string }) {
  return (
    <iframe
      className="w-[350px] sm:w-[450px] md:w-[680px] h-[350px] md:h-[450px] lg:w-[980px] lg:h-[550px]"
      width={0}
      height={0}
      src={url}
      allowFullScreen
    />
  );
}
