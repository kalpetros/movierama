import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { buildEndpoint } from '../utils';

export const GenreContext = createContext([]);

export const GenreStateProvider = ({ children }) => {
  const [state, setState] = useState([]);
  const endpoint = buildEndpoint('genres');

  useEffect(() => {
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
  }, [endpoint]);

  return (
    <GenreContext.Provider value={{ state }}>{children}</GenreContext.Provider>
  );
};

GenreStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
