import React, { useContext } from 'react';

import { MoviesContext } from '../store/MoviesContext';

export const Header = () => {
  const { query, setQuery } = useContext(MoviesContext);

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
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
              value={query}
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
