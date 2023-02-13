import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../component/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="pb-10">
      <div className="w-full h-[500px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imgOriginal(backdrop_path)}`,
          }}
        ></div>
        <div className="w-full h-[400px] max-w-[800px] mx-auto relative -mt-[200px] z-10 pb-10">
          <img
            src={tmdbAPI.imgOriginal(poster_path)}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <h1 className="font-semibold text-white text-4xl text-center pb-10">
          {title}
        </h1>
        {genres.length > 0 && (
          <div className="flex items-center gap-x-5 pb-10 justify-center">
            {genres.map((item) => (
              <span
                key={item.id}
                className="text-primary border-primary border px-4 py-2 rounded-lg "
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <p className="text-white text-center leading-relaxed max-w-[800px] mx-auto mb-10">
          {overview}
        </p>
        <MovieCredits></MovieCredits>
        <MovieVideos></MovieVideos>
        <MovieSimilar></MovieSimilar>
      </div>
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <div className="pb-10">
      <h2 className="text-white text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.cast_id}>
            <img
              src={tmdbAPI.imgOriginal(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-5"
            />
            <span className="text-white text-center text-xl font-semibold">
              {item.name}{" "}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results && results.length <= 0) return null;
  return (
    <div className="py-10 grid grid-cols-2 gap-10">
      {results.slice(0, 4).map((item) => (
        <div key={item.id}>
          <h3 className="font-medium text-xl text-secondary mb-5">
            {item.name}
          </h3>
          <iframe
            width="100%"
            height="350"
            src={`https://www.youtube.com/embed/${item.key}`}
            title={item.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results && results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="font-medium text-white text-3xl text-center mb-10">
        Similar Movie
      </h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetail;
