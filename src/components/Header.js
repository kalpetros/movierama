import React, { useState, useEffect, useContext } from 'react';
import { MoviesContext } from '../store/MoviesContext';

export const Header = () => {
  const [value, setValue] = useState('');
  const { dispatch } = useContext(MoviesContext);

  useEffect(() => {
    if (value !== '') {
      dispatch({ type: 'GET', query: value });
    }
  }, [value]);

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
  };

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
          <h1>In Theaters</h1>
        </div>
      </div>
    </header>
  );
};
