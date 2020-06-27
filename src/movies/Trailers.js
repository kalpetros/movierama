import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { TrailerModal } from '../components/TrailerModal';

export const Trailers = (props) => {
  const [results, setResults] = useState([]);
  const { id: id } = props;

  useEffect(() => {
    const fetchDetails = () => {
      const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
      const endpoint = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

      fetch(endpoint, {
        method: 'GET',
      })
        .then((response) => {
          if (response.status !== 200) throw new Error(response.status);
          return response.json();
        })
        .then((data) => {
          setResults(data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchDetails();
  }, [id]);

  const trailers = results.slice(0, 1).map((result, index) => {
    return <TrailerModal key={`movie-trailer-${index}`} id={result.key} />;
  });

  return <div className="movie__details__trailers">{trailers}</div>;
};

Trailers.defaultProps = {
  id: 1,
};

Trailers.propTypes = {
  id: PropTypes.number.isRequired,
};
