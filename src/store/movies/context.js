import React, { createContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { buildEndpoint } from './utils';
import { fetchMovies } from './utils';

export const MoviesContext = createContext([]);

export const MoviesStateProvider = ({ children }) => {
  const [data, setData] = useState({
    init: true,
    page: 1,
    pages: 0,
    results: [],
  });
  const [query, setQuery] = useState('');
  const page = useRef(1);
  const pages = useRef(0);
  pages.current = data.pages;
  const movies = data.results;
  const endpoint = buildEndpoint(query, data.page);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  useEffect(() => {
    if (data.init && data.results.length === 0) {
      fetchMovies(data, endpoint, setData);
    }
  }, [data]);

  useEffect(() => {
    if (!data.init) {
      fetchMovies(data, endpoint, setData);
    }
  }, [page.current]);

  // Perform a cleanup after each new query
  useEffect(() => {
    if (!data.init) {
      page.current = 1;
      setData({
        init: true,
        page: 1,
        pages: 0,
        results: [],
      });
    }
  }, [query]);

  const scrollEvent = () => {
    const offsetHeight = document.body.offsetHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (innerHeight + scrollY === offsetHeight) {
      if (page.current < pages.current) {
        page.current = page.current + 1;
        setData((state) => {
          const newState = Object.assign({}, state);
          newState.page = page.current;
          return newState;
        });
      }
    }
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
