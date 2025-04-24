
import { X } from 'lucide-react';
import PropTypes from 'prop-types';

WatchedMovieList.propTypes = {
  watched: PropTypes.arrayOf(
    PropTypes.shape({
      imdbId: PropTypes.string,
      title: PropTypes.string,
      poster: PropTypes.string,
      imdbRating: PropTypes.number,
      userRating: PropTypes.number,
      runtime: PropTypes.number,
    })
  ),
  handleDeleteMovie: PropTypes.func,
};

export default function WatchedMovieList({ watched ,handleDeleteMovie}) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbId}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <div className="flex flex-col gap-y-4 w-full">
              <h3>{movie.title}</h3>
              <div className="  flex justify-between items-center">
                <div className=" movie-year ">
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
                </div>
                <button
                  className=" w-6 h-6 bg-[#fa5252] hover:bg-[#e03131] transition-all duration-300  p-5 rounded-full flex justify-center items-center text-slate-700  "
                  onClick={() => handleDeleteMovie(movie.imdbId)}
                >
                  <span><X  size={20} /></span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
