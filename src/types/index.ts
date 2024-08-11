export interface MovieBase {
    backdrop_path: string,
    id: number,
    title: string,
    original_title: string,
    overview:string,
    poster_path: string,
    genre_ids: number[],
    release_date: string,
    vote_average: number,
    vote_count: number,
}

export interface TVSeriesAndMovies extends MovieBase{
    name:string,
    first_air_date:string,
}

export interface Genre {
    id:number,
    name:string
}

export interface DetailContent {
    id:number,
    backdrop_path:string,
    genres:Genre[],
    original_title:string,
    overview:string,
    poster_path:string,
    release_date:string,
    status:string,
    title?:string,
    vote_average:number
    name?:string,
}

export interface MovieUrl {
    id:string,
    key:string
}