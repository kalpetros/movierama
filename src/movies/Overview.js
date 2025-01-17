import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { buildEndpoint } from '../utils';
import { Trailers } from './Trailers';

export const Overview = (props) => {
  const [data, setData] = useState([]);
  const { id: id } = props;
  const endpoint = buildEndpoint('movie', { id: id });

  useEffect(() => {
    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status !== 200) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);

  if (Object.keys(data).length === 0) {
    return null;
  }

  const overview = data.overview;
  const genres = data.genres.map((genre) => {
    return genre.name;
  });
  const genresText = genres.join(', ');
  const producers = data.production_companies.map((company) => {
    return company.name;
  });
  const producersText = producers.length > 0 ? producers.join(', ') : 'N/A';
  const countries = data.production_countries.map((country) => {
    return country.name;
  });
  const countriesText = countries.length > 0 ? countries.join(', ') : 'N/A';
  const runtime = data.runtime !== null ? `${data.runtime} minutes` : 'N/A';

  return (
    <div className="movie__details__meta">
      <Trailers id={id} />
      <small className="font-bold text-uppercase">{genresText}</small>
      <p>{overview}</p>
      <h3>Runtime</h3>
      <small className="font-bold text-uppercase">{runtime}</small>
      <h3>Producers</h3>
      <small className="font-bold text-uppercase">{producersText}</small>
      <h3>Countries</h3>
      <small className="font-bold text-uppercase">{countriesText}</small>
    </div>
  );
};

Overview.defaultProps = {
  id: 1,
};

Overview.propTypes = {
  id: PropTypes.number.isRequired,
};
