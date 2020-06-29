import React, { createContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const MoviesContext = createContext([]);

const buildEndpoint = (query, page) => {
  const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
  const baseEndpoint = 'https://api.themoviedb.org/3/';
  const nowPlayingEndpoint = `${baseEndpoint}movie/now_playing?api_key=${apiKey}&language=en-US&page=`;
  const searchMovieEndpoint = `${baseEndpoint}search/movie?api_key=${apiKey}&language=en-US&page=`;

  let endpoint = `${nowPlayingEndpoint}${page}`;

  if (query.length > 0) {
    endpoint = `${searchMovieEndpoint}${page}&query=${query}`;
  }

  return endpoint;
};

export const MoviesStateProvider = ({ children }) => {
  const [data, setData] = useState({
    pages: 0,
    results: [],
  });
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const pages = useRef(0);
  const pageRef = useRef(page);
  const endpoint = buildEndpoint(query, page);
  const movies = data.results;

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  // Perform a cleanup after each new query
  useEffect(() => {
    if (query.length > 0) {
      setData({
        pages: 0,
        results: [],
      });
    } else {
      if (movies.length > 0) {
        setData({
          pages: 0,
          results: [],
        });
      }
    }
  }, [query]);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [movies]);

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
      if (pageRef.current < pages.current) {
        pageRef.current = pageRef.current + 1;
        setPage(pageRef.current);
      }
    }
  };

  const fetchMovies = () => {
    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status !== 200) throw new Error(response.status);
        return response.json();
      })
      .then((newData) => {
        pages.current = newData.total_pages;
        setData({
          pages: newData.total_pages,
          results: [...data.results, ...newData.results],
        });
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

MoviesStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
