import { useEffect, useState } from "react";
const key = `4b0c5b54`;

export  function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
 // fetching Data
 // we use controller to remove the previous Request when we enter in a new Request
   useEffect(() => {
    // callback?.()
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

     fetchMovies()
     return function(){
       controller.abort()
     }
    
   }, [query]);

   return {movies, isLoading, error}
 
}
