import React, { createContext, useEffect, useState } from 'react';

export const GenreContext = createContext([]);

export const GenreStateProvider = ({ children }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
    const endpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status !== 200) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setState(data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <GenreContext.Provider value={{ state }}>{children}</GenreContext.Provider>
  );
};
