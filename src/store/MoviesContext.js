import React, { createContext, useState, useEffect, useContext } from 'react';
import { ConfigurationContext } from './ConfigurationContext';

export const MoviesContext = createContext([]);

export const MoviesStateProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const { state: configuration } = useContext(ConfigurationContext);

  const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
  const baseEndpoint = 'https://api.themoviedb.org/3/';
  const nowPlayingEndpoint = `${baseEndpoint}movie/now_playing?api_key=${apiKey}&language=en-US&page=`;
  const searchMovieEndpoint = `${baseEndpoint}search/movie?api_key=${apiKey}&language=en-US&page=`;

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  // Perform a cleanup after each new query
  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    if (Object.keys(configuration).length > 0) {
      if (movies.length === 0) {
        fetchMovies();
      }
    }
  }, [movies, configuration]);

  useEffect(() => {
    if (totalPages > 0) {
      fetchMovies();
    }
  }, [page]);

  const scrollEvent = () => {
    const offsetHeight = document.body.offsetHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (innerHeight + scrollY === offsetHeight) {
      // TODO: Check when it ends
      setPage((p) => p + 1);
    }
  };

  const fetchMovies = () => {
    let endpoint = `${nowPlayingEndpoint}${page}`;

    if (query.length > 0) {
      endpoint = `${searchMovieEndpoint}${page}&query=${query}`;
    }

    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalPages(data.total_pages);
        setMovies([...movies, ...data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MoviesContext.Provider value={{ movies, query, setQuery }}>
      {children}
    </MoviesContext.Provider>
  );
};
