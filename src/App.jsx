import { useState } from "react";

import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Main from "./Components/Main/Main";
import Box from "./Components/Box/Box";
import MovieList from "./Components/MovieList/MovieList";
import WatchedSummary from "./Components/WatchedSummary/WatchedSummary";
import WatchedMovieList from "./Components/WatchedMovieList/WatchedMovieList";
import Loader from "./Components/loader/Loader";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import { useMovies } from "./Hooks/useMovies";
import useLocalStorage from "./Hooks/useLocalStorage";
const key = `4b0c5b54`;
// const query = `interstellar`;
function App() {


  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null)

  const {movies,isLoading,error} = useMovies(query)
  const [watched, setWatched] = useLocalStorage([],"watched")
  
  // const [watched, setWatched] = useState(function(){
  //   const storedWatched = localStorage.getItem('watched')
  //   return storedWatched ? JSON.parse(storedWatched) : []
  // });

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
