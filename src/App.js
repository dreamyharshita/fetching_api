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
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();

        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }, []);
  
    useEffect(() => {
      fetchMoviesHandler();
    }, [fetchMoviesHandler]);
  
  

  return (
    <React.Fragment>
      <section>
       <Form></Form>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      
        {loading && <p>Loading...</p>}
        { !loading &&   <MovieList movies={movies} /> }
      </section>
    </React.Fragment>
  );
}

export default App;
