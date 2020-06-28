import React, { useContext, useEffect, useState } from 'react';

import { MoviesContext } from '../store/MoviesContext';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}

export const Header = () => {
  const [value, setValue] = useState('');
  const { query, setQuery } = useContext(MoviesContext);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

  let title = 'In Theaters';
  if (query.length > 0) {
    title = `Movies "${query}"`;
  }

  return (
    <header className="header">
      <div className="header__content">
        <div>
          <div>
            <h1>Welcome</h1>
          </div>
          <div>
            <input
              type="text"
              value={value}
              className="input"
              placeholder="Type here to search for your favorite movie..."
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
      <div className="header__title">
        <div>
          <h1>{title}</h1>
        </div>
      </div>
    </header>
  );
};
