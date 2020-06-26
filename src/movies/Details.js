import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Overview } from './Overview';
import { SimilarMovies } from './SimilarMovies';
import { Reviews } from './Reviews';

export const Details = (props) => {
  const [view, setView] = useState('overview');
  const { id: id, isSelected: isSelected } = props;

  const menuSelectedClass = 'movie__details__menu--selected';
  let baseClass = isSelected
    ? 'movie__details movie__details--active'
    : 'movie__details movie__details--inactive';
  let currentView = null;

  const handleChangeView = (e) => {
    const id = e.currentTarget.dataset.id;
    setView(id);
  };

  if (isSelected) {
    if (view === 'overview') {
      currentView = <Overview id={id} />;
    } else if (view === 'reviews') {
      currentView = <Reviews id={id} />;
    } else if (view === 'similar') {
      currentView = <SimilarMovies id={id} />;
    }
  }

  return (
    <div className={baseClass}>
      {currentView}
      <div className="movie__details__menu">
        <ul>
          <li
            data-id="overview"
            className={view === 'overview' ? menuSelectedClass : null}
            onClick={handleChangeView}
          >
            Overview
          </li>
          <li
            data-id="reviews"
            className={view === 'reviews' ? menuSelectedClass : null}
            onClick={handleChangeView}
          >
            Reviews
          </li>
          <li
            data-id="similar"
            className={view === 'similar' ? menuSelectedClass : null}
            onClick={handleChangeView}
          >
            Similar Movies
          </li>
        </ul>
      </div>
    </div>
  );
};

Details.defaultProps = {
  id: 1,
  isSelected: false,
};

Details.propTypes = {
  id: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
