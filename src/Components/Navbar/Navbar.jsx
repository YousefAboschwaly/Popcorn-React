
import PropTypes from 'prop-types';
Navbar.propTypes = {
  movies: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired
};
export default function Navbar({ movies , query , setQuery }) {


  return (
    <>
      <nav className="nav-bar md:px-[3.2rem] px-6">
        <div className="logo">
          <span role="img" className='md:text-[3.2rem] text-4xl'>🍿</span>
          <h1 className='md:text-[2.4rem] text-3xl'>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results md:text-[1.8rem] text-2xl">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
      </>

  );
}
