import React, { useContext } from 'react';

import { MoviesContext } from '../store/movies/context';
import { Movie } from './Movie';

export const Movies = () => {
  const { movies } = useContext(MoviesContext);

  const list = movies.map((movie, index) => {
    return <Movie key={`movie-${index}`} data={movie} />;
  });

  return list;
};
