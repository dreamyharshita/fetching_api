import React, { useState } from 'react';
import MovieList from './components/MovieList';
import './App.css';

function App() {

  const [movies,setMovies] = useState([]);
  const[ loading,setLoading]=useState(false);

  async function dummyMovies()
  {
    setLoading(true);
    const res = await fetch("https://swapi.dev/api/films");
    console.log(res)
    const res2 = await res.json();
    console.log(res2)
    setMovies(res2.results)
    setLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={dummyMovies}>Fetch Movies</button>
      </section>
      <section>
      
        {loading && <p>Loading...</p>}
        {
          !loading &&   <MovieList movies={movies} />
        }
      </section>
    </React.Fragment>
  );
}

export default App;
