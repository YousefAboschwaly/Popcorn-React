import PropTypes from 'prop-types'
Movie.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired
  }).isRequired,
  handleSelection: PropTypes.func.isRequired
};;

export default function Movie({ movie , handleSelection }) {
  return (
    <>
      <li
        onClick={() => handleSelection(movie.imdbID)}
        className="flex  items-center w-full"
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <div className=" flex flex-col gap-y-4  w-full">
          <h3>{movie.Title}</h3>
          <div className="movie-year">
            <p>
              <span>📅</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </div>
      </li>
    </>
  );
}


