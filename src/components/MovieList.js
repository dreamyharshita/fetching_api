import React from 'react';

import Movie from './Movie';
import classes from './MovieList.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.date}
          openingText={movie.openingText}
          deleteMovie={props.deleteMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;