import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Overview = (props) => {
  const [data, setData] = useState([]);
  const { id: id } = props;

  useEffect(() => {
    const fetchDetails = () => {
      const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
      const endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

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
    };

    fetchDetails();
  }, [id]);

  if (Object.keys(data).length === 0) {
    return null;
  }

  const overview = data.overview;
  const genres = data.genres.map((genre, index) => {
    return genre.name;
  });
  const video = data.video;
  const genresText = genres.join(', ');

  const producers = data.production_companies.map((company, index) => {
    return company.name;
  });

  const producersText = producers.length > 0 ? producers.join(', ') : 'N/A';

  const countries = data.production_countries.map((country, index) => {
    return country.name;
  });

  const countriesText = countries.length > 0 ? countries.join(', ') : 'N/A';

  const runtime = `${data.runtime} minutes`;

  return (
    <div className="movie__details__meta">
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
