import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ConfigurationContext } from '../store/ConfigurationContext';
import { buildImageUrl } from '../utils';

export const SimilarMovies = (props) => {
  const [data, setData] = useState([]);
  const { state: configuration } = useContext(ConfigurationContext);
  const { id: id } = props;

  useEffect(() => {
    const fetchSimilarMovies = () => {
      const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
      const endpoint = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`;

      fetch(endpoint, {
        method: 'GET',
      })
        .then((response) => {
          if (response.status !== 200) throw new Error(response.status);
          return response.json();
        })
        .then((data) => {
          setData(data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchSimilarMovies();
  }, [id]);

  const list = data.map((movie, index) => {
    const imageUrl = buildImageUrl(configuration, movie.poster_path, 2);

    return (
      <a key={`similar-movie-${index}`} className="movie__details__image">
        <img src={imageUrl} alt={movie.title} />
      </a>
    );
  });

  let content = <p>We could not find any similar movies.</p>;

  if (list.length > 0) {
    content = <div className="movie__details__list">{list}</div>;
  }

  return (
    <div className="movie__details__meta">
      <h2>Similar Movies</h2>
      {content}
    </div>
  );
};

SimilarMovies.defaultProps = {
  id: 1,
};

SimilarMovies.propTypes = {
  id: PropTypes.number.isRequired,
};
