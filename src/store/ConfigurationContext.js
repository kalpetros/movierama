import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { buildEndpoint } from '../utils';

export const ConfigurationContext = createContext({});

export const ConfigurationStateProvider = ({ children }) => {
  const [state, setState] = useState({});
  const endpoint = buildEndpoint('configuration');

  useEffect(() => {
    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status !== 200) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setState(data.images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);

  return (
    <ConfigurationContext.Provider value={{ state }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

ConfigurationStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
