import React, { useState } from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { apiKey, fetcher } from "../../config";
import Button from "../Button/Button";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const Banner = () => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    fetcher
  );
  const isLoading = !data && !error;
  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              {isLoading && <BannerItemsSkeleton></BannerItemsSkeleton>}
              {!isLoading && <BannerItems item={item}></BannerItems>}
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItems({ item }) {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="absolute inset-0 bg-opacity-25 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)] "></div>
      <img
        alt=""
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        className="object-cover object-top w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md ">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Action
          </span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
}

function BannerItemsSkeleton() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-opacity-25 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.6)] "></div>
      <LoadingSkeleton className="w-full h-full rounded-lg"></LoadingSkeleton>
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">
          <LoadingSkeleton width="200px" height="30px"></LoadingSkeleton>
        </h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md bg-[#eee]">
            <LoadingSkeleton className="px-4 py-2 rounded-md "></LoadingSkeleton>
          </span>
          <span className="px-4 py-2 border border-white rounded-md bg-[#eee]">
            <LoadingSkeleton className="px-4 py-2 rounded-md "></LoadingSkeleton>
          </span>
          <span className="px-4 py-2 border border-white rounded-md bg-[#eee]">
            <LoadingSkeleton className="px-4 py-2 rounded-md "></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          className="rounded-lg inline-block"
          width="250px"
          height="50px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
}
export default Banner;
