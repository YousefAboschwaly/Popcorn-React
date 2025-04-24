import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";
import Box from "./Components/Box/Box";
import MovieList from "./Components/MovieList/MovieList";
import WatchedSummary from "./Components/WatchedSummary/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList/WatchedMovieList";
import Loader from "./Components/loader/Loader";
import MovieDetails from "./Components/loader/MovieDetails/MovieDetails";
const key = `4b0c5b54`;
// const query = `interstellar`;
function App() {

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
          {error && <p className="error ">{error}</p>}
         
        </Box>
        <Box>

        {selectedMovie ? <MovieDetails selectedMovieId={selectedMovie} handleClose={handleClose} onWatched={handleWatchedMovies} watched={watched} keyId={key}/> : <>
        
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} handleDeleteMovie={handleDeleteMovie} />
     
        </>}


        </Box>
      </Main>
    </>
  );
}

export default App;
