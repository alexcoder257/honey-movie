import { Genre, MovieBase } from "@/types";

/**
 * file_size example: original or w500,...
 */
export function getImageURL(file_size: string, file_path: string) {
  if(!file_path) return '/images/default-image.jpg'
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${file_size}${file_path}`;
}

export function getVideoUrl(key:string){
  if(!key)return ''
  return process.env.NEXT_YOUTUBE_BASE_VIDEO + key
}

export function getGenre (movie: MovieBase, genres: Genre[]){
  return genres.find((item) => item.id === movie.genre_ids[0]);
};

export function renderServerError(error:any){
  if(error instanceof Error){
    throw new Error(error.message)
  }else{
    throw new Error("Internal Server Error!")
  }
}