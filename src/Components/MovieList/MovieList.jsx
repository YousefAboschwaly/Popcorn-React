import React, { useState } from "react";
import Movie from "../Movie/Movie";

export default function MovieList({ movies , handleSelection }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} handleSelection={handleSelection}  />
        ))}
      </ul>
    </>
  );
}
