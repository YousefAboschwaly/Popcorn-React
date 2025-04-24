import Movie from "../Movie/Movie";
import PropTypes from 'prop-types';

MovieList.propTypes = {
  movies: PropTypes.array,
  handleSelection: PropTypes.func
};

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


