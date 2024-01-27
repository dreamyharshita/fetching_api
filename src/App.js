import React, { useState,useCallback,useEffect } from 'react';
import MovieList from './components/MovieList';
import './App.css';
import Form from './components/Form';

function App() {

  const [movies,setMovies] = useState([]);
  const[ loading,setLoading]=useState(false);
  const [error, setError] = useState(null);

  
    const fetchMoviesHandler = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://react-http-d69b0-default-rtdb.firebaseio.com/movies.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();

        const loadedMovies = [];

      for(const key in data)
      {
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].text,
          date:data[key].date
        })
      }

        // const transformedMovies = data.results.map((movieData) => {
          // return {
           // id: movieData.episode_id,
           // title: movieData.title,
           // openingText: movieData.opening_crawl,
           // releaseDate: movieData.release_date,
        //  };
        //});
        setMovies(loadedMovies);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }, []);
  
    useEffect(() => {
      fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    let content = <p>Found no movies.</p>;

    if (movies.length > 0) {
     
      content = <MovieList deleteMovie={deleteMovie} movies={movies} />;
    }
  
    if (error) {
      content = <p>{error}</p>;
    }
    if (loading) {
      content = <p>Loading...</p>;
    }

    
  
    async function deleteMovie(id)
    {
      console.log(id)
      try{
      await fetch(`https://react-http-d69b0-default-rtdb.firebaseio.com/movies/${id}`,{
        method:'DELETE',
       
        headers: {
          "Content-Type": "application/json"
          },
      });}catch(error){
        console.log("error occured",error);
      }

      //  setStatus('deleted');
    }
    async function addMovies(obj)
    {
      const response = await fetch("https://react-http-d69b0-default-rtdb.firebaseio.com/movies.json",{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{'Content-Type':'application/json'}
      })
      const data = await response.json();
      console.log(data)
    }

  return (
    <React.Fragment>
      <section>
       <Form addMovies={addMovies}></Form>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      
      {content}
      </section>
    </React.Fragment>
  );
}

export default App;
