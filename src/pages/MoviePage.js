import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, { MovieCardSekeleton } from "../component/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";

const itemsPerPage = 20;
const MoviePage = (type = "") => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [fliter, setFliter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const handleFilterChange = (e) => {
    setFliter(e.target.value);
  };
  const fliterDebounce = useDebounce(fliter, 500);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (fliterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(fliterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [fliterDebounce, nextPage]);

  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1 ">
          <input
            type="text"
            placeholder="Type here to search ..."
            className="w-full p-5 bg-slate-800 outline-none text-white"
            onChange={handleFilterChange}
          />
        </div>
        <button className="flex-0 p-5 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10 mb-10">
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
          <MovieCardSekeleton></MovieCardSekeleton>
        </div>
      )}
      <div className="grid grid-cols-4 gap-10 mb-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="paginate"
        />
      </div>
    </div>
  );
};

export default MoviePage;
