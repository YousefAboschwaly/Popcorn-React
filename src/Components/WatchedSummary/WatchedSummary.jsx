
import PropTypes from 'prop-types';
WatchedSummary.propTypes = {
  watched: PropTypes.arrayOf(
    PropTypes.shape({
      imdbRating: PropTypes.number.isRequired,
      userRating: PropTypes.number.isRequired,
      runtime: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default function WatchedSummary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(2)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime.toString().length>3? avgRuntime.toFixed(2):avgRuntime} min</span>
          </p>
        </div>
      </div>
    </>
  );
}
