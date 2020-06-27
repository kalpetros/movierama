import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { ConfigurationContext } from '../store/ConfigurationContext';
import { Details } from './Details';
import { GenreContext } from '../store/GenreContext';
import { buildImageUrl } from '../utils';

export const Movie = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const { state: configuration } = useContext(ConfigurationContext);
  const { state: genres } = useContext(GenreContext);
  const { data: data } = props;

  const handleClick = (e) => {
    setIsSelected((p) => (p ? false : true));
    const element = document.getElementById(`movie-${data.id}`);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  let style = {};
  let overview = data.overview.length === 0 ? 'N/A' : data.overview;

  if (data.overview.length > 200) {
    overview = `${data.overview.substring(0, 200)}...`;
  }

  let legend = <p>{overview}</p>;
  const posterUrl = buildImageUrl(configuration, data.poster_path, 2);
  const year = new Date(data.release_date).getFullYear();

  let genresText = null;
  let genreList = data.genre_ids.map((id) => {
    const label = genres.find((g) => g.id === id);
    return label.name;
  });

  if (genreList.length > 0) {
    genresText = genreList.join(', ');
  }

  if (isSelected) {
    const popularity = Math.round(data.popularity, 0);
    const releaseDate = new Date(data.release_date);
    const date = releaseDate.getDate();
    const month = releaseDate.getMonth() + 1;
    const year = releaseDate.getFullYear();
    const dateString = `${date}/${month}/${year}`;
    const backgroundImage = buildImageUrl(configuration, data.poster_path, 5);

    legend = (
      <>
        <h3>Release date</h3>
        <p>{dateString}</p>
      </>
    );

    genresText = `Popularity - ${popularity}`;

    style = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    };
  }

  return (
    <div className="movie" style={style}>
      <div
        className="movie__wrapper"
        id={`movie-${data.id}`}
        onClick={handleClick}
      >
        <div className="movie__wrapper__content">
          <div className="movie__wrapper__image">
            <img src={posterUrl} alt="movie_poster" />
          </div>
          <div className="movie__wrapper__body">
            <div className="movie__wrapper__meta">
              <h2>
                {data.title} ({year})
              </h2>
              {legend}
            </div>
            <div className="movie__wrapper__footer">
              <div>
                <h3 className="font-bold">{genresText}</h3>
              </div>
              <div>
                <h3 className="font-bold text-right">
                  {data.vote_average} / 10
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Details id={data.id} isSelected={isSelected} />
    </div>
  );
};

Movie.propTypes = {
  data: PropTypes.object.isRequired,
};
