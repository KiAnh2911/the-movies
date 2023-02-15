import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../Button/Button";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { title, vote_average, poster_path, release_date, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none bg-slate-800">
      <img
        src={tmdbAPI.imgW500(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-2 text-xl font-bold ">{title}</h3>
        <div className="flex items-center justify-between mb-8 text-sm text-opacity-60">
          <span className="year">{new Date(release_date).getFullYear()}</span>
          <span className="">{vote_average}</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch Now</Button>
      </div>
    </div>
  );
};

export default MovieCard;

export function MovieCardSekeleton() {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none bg-slate-800">
      <LoadingSkeleton className="w-full h-[250px] rounded-lg mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="mb-2 text-xl font-bold ">
          <LoadingSkeleton className="w-full h-[20px] mb-5"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-5 text-sm text-opacity-60">
          <span className="year w-[40px] bg-slate-500">
            <LoadingSkeleton className="w-[40px] h-[10px] bg-slate-500"></LoadingSkeleton>
          </span>
          <span className="w-[20px] bg-">
            <LoadingSkeleton className="w-[20px] h-[10px]"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton className="w-full h-[40px] rounded-lg"></LoadingSkeleton>
      </div>
    </div>
  );
}
