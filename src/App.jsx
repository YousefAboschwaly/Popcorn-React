import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";
import Box from "./Components/Box/Box";
import MovieList from "./Components/MovieList/MovieList";
import WatchedSummary from "./Components/WatchedSummary/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList/WatchedMovieList";
import StarRating from "./Components/StarRating/StarRating";
import Loader from "./Components/loader/Loader";
import MovieDetails from "./Components/loader/MovieDetails/MovieDetails";
const key = `a696664f`;
// const query = `interstellar`;
function App() {
  const tempMovieData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
  ];

  const tempWatchedData = [
    {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
    },
    {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
    },
  ];
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null)


  // functions that handle MoviesDetails when i clicked on the Movies that in left

function handleSelection(id)
{
  setSelectedMovie(selectedMovie => selectedMovie === id?null:id)
  

}
function handleClose()
{
  setSelectedMovie(null)
}
function handleDeleteMovie(id)
{
  setWatched(watched=>watched.filter(watched=> watched.imdbId !== id))
}
// functions that handle watched movies that in right 
function handleWatchedMovies(newMovie){
  setWatched((watched)=>[...watched , newMovie])

}




// fetching Data
  useEffect(() => {
// we use controller to remove the previous Request when we enter in a new Request
      const controller = new AbortController()
   async function fetchMovies(){
    try{
      setIsLoading(true)
      setError('')
      const resp = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal:controller.signal});
      if(!resp.ok) throw new Error('Some thing went wrong when fetching Movies')
      const data = await resp.json()
    if(data.Response ==="False") throw new Error('⛔ Movies not found')
      setMovies(data.Search)
    setError('')
    }catch(err){
        setError(err.message)
    }
    finally{
      setIsLoading(false)
    }
    


    }

    if(query.length < 3){
      setError('')
      setMovies([])
        return;
      
    }
    handleClose()
    fetchMovies()
    return function(){
      controller.abort()
    }
   
  }, [query]);


  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error &&<MovieList movies={movies} handleSelection={handleSelection}  />}
          {error && <p className="error">{error}</p>}
         
        </Box>
        <Box>

        {selectedMovie ? <MovieDetails selectedMovieId={selectedMovie} handleClose={handleClose} onWatched={handleWatchedMovies} watched={watched}/> : <>
        
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} handleDeleteMovie={handleDeleteMovie} />
     
        </>}


        </Box>
      </Main>
    </>
  );
}

export default App;
