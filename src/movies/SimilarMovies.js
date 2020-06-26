import React, { useState, useEffect, useContext } from 'react';
import { ConfigurationContext } from '../store/ConfigurationContext';

export const SimilarMovies = (props) => {
  const [data, setData] = useState([]);
  const { state: configuration } = useContext(ConfigurationContext);
  const { id: id } = props;

  useEffect(() => {
    fetchSimilarMovies();
  }, []);

  const buildImageUrl = (path, size) => {
    const baseUrl = configuration.secure_base_url;
    const posterSize = configuration.poster_sizes[size];
    let imageUrl = null;

    if (path) {
      imageUrl = `${baseUrl}${posterSize}${path}`;
    }

    return imageUrl;
  };

  const fetchSimilarMovies = () => {
    const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
    const endpoint = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`;

    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const list = data.map((movie, index) => {
    const imageUrl = buildImageUrl(movie.poster_path, 2);

    return (
      <a key={`similar-movie-${index}`} className="movie__details__image">
        <img src={imageUrl} alt={movie.title} />
      </a>
    );
  });

  let content = <p>We couldn't find any similar movies.</p>;

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
