import React from 'react';

import classes from './Movie.css';

const Movie = (props) => {
const deletehandler=(e)=>{
e.preventDefault();
console.log(props.id)
props.deleteMovie(props.id);
}
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.date}</h3>
      <p>{props.openingText}</p>
      <button onClick={deletehandler}>Delete</button>
    </li>
  );
};

export default Movie;