import React, { createContext, useState, useEffect, useContext } from 'react';
import { ConfigurationContext } from './ConfigurationContext';

export const MoviesContext = createContext({});

export const MoviesStateProvider = ({ children }) => {
  const [state, setState] = useState({});
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const { state: configuration } = useContext(ConfigurationContext);

  const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
  const baseEndpoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

  useEffect(() => {
    if (Object.keys(configuration).length > 0) {
      fetchData();
    }
  }, [page, configuration]);

  useEffect(() => {
    if (Object.keys(state).length > 0) {
      setMovies([...movies, ...state.results]);
    }
  }, [state]);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  const scrollEvent = () => {
    const offsetHeight = document.body.offsetHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (innerHeight + scrollY === offsetHeight) {
      // TODO: Check when it ends
      setPage((p) => p + 1);
    }
  };

  const fetchData = () => {
    const endpoint = `${baseEndpoint}&language=en-US&page=${page}`;

    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setState(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <MoviesContext.Provider value={{ movies, fetchData }}>
      {children}
    </MoviesContext.Provider>
  );
};
