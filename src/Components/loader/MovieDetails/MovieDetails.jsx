import React, { useEffect, useState } from "react";
import Star from "../../Star/Star";
import StarRating from "../../StarRating/StarRating";
import Loader from "../Loader";
const key = `a696664f`;

export default function MovieDetails({ selectedMovieId, handleClose , onWatched, watched }) {
  const [Movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched=  watched.find((movieWatched)=>movieWatched.imdbId === selectedMovieId)


  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
    
  } = Movie;
  

  function handleAdd(){
    const newMovie = {
      imdbId: selectedMovieId,
      title,
      year,
      poster,
      userRating,      
      imdbRating: Number(imdbRating),
      runtime : Number(runtime.split(' ').at(0))||0,
    }
    onWatched(newMovie)
    handleClose()
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const resp = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
      );
      const data = await resp.json();
      setMovie(data);
      setIsLoading(false)

    }

    getMovieDetails();
  }, [selectedMovieId]);

useEffect(()=>{
  if(!title)return
document.title= ` Movie | ${title}`
return function(){
  document.title = 'usePopcorn'
  console.log(title)
}
}, [title])

useEffect(function(){
  function callBack(e){
    if(e.key === 'Escape'){
      handleClose()
      console.log('CLOSING')
    }
  }
document.addEventListener('keydown',callBack)
return function(){
  document.removeEventListener('keydown',callBack)
}
},[handleClose])



  return (
    <div className="details" key={selectedMovieId}>
{isLoading ?<Loader/> :

  <>
  
  <header>
        <button className="btn-back" onClick={handleClose}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${genre} Movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
      <div className="rating">
       {isWatched ? <p>Movie was rated with {isWatched?.userRating}⭐ </p> :  
          <>
          <StarRating size={24} maxRating={10} onSetRating={setUserRating}/>
         {userRating >0 &&  (<button className="btn-add" onClick={handleAdd}>+ Add to list</button>) }
      </>
       }
        </div>
        <p>
          <em>
            {plot}
          </em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
  </>
}

    </div>
  );
}
