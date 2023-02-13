import React, { Fragment } from "react";
import MovieList from "../component/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="mb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-semibold text-white capitalize ">
          Now Playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="mb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-semibold text-white capitalize ">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="mb-20 movies-layout page-container">
        <h2 className="mb-10 text-3xl font-semibold text-white capitalize ">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
