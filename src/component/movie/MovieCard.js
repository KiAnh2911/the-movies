import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Button from "../Button/Button";

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
