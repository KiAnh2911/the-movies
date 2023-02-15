import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSekeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
// https://api.themoviedb.org/3/movie/now_playing?api_key=ed4724e9eb243038b6318e509cc149af
// ed4724e9eb243038b6318e509cc149af
const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardSekeleton></MovieCardSekeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSekeleton></MovieCardSekeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSekeleton></MovieCardSekeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSekeleton></MovieCardSekeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
