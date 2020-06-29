import React, { createContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const MoviesContext = createContext([]);

const buildEndpoint = (query, page) => {
  const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
  const baseEndpoint = 'https://api.themoviedb.org/3/';
  const language = '&language=en-US';
  const nowPlayingEndpoint = `${baseEndpoint}movie/now_playing?api_key=${apiKey}${language}&page=`;
  const searchMovieEndpoint = `${baseEndpoint}search/movie?api_key=${apiKey}${language}&page=`;

  let endpoint = `${nowPlayingEndpoint}${page}`;

  if (query.length > 0) {
    endpoint = `${searchMovieEndpoint}${page}&query=${query}`;
  }

  return endpoint;
};

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
  const movies = data.results;

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  useEffect(() => {
    if (data.init && data.results.length === 0) {
      fetchMovies();
    }
  }, [data]);

  useEffect(() => {
    if (!data.init) {
      fetchMovies();
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

  const fetchMovies = () => {
    const endpoint = buildEndpoint(query, data.page);
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
          init: false,
          page: data.page,
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
