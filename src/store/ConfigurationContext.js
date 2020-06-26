import React, { createContext, useState, useEffect } from 'react';

export const ConfigurationContext = createContext({});

export const ConfigurationStateProvider = ({ children }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
    const endpoint = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;

    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setState(data.images);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ConfigurationContext.Provider value={{ state }}>
      {children}
    </ConfigurationContext.Provider>
  );
};
