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

  const posterUrl = buildImageUrl(configuration, data.poster_path, 2);
  const description =
    typeof data.overview !== 'undefined' && data.overview.length === 0
      ? 'N/A'
      : data.overview;
  let style = {};
  let overview = <p>{description}</p>;
  let year = 'N/A';
  let genresText = null;

  if (typeof data.overview !== 'undefined' && data.overview.length > 200) {
    overview = <p>`${data.overview.substring(0, 200)}...`</p>;
  }

  if (
    typeof data.release_date !== 'undefined' &&
    data.release_date.length > 0
  ) {
    year = new Date(data.release_date).getFullYear();
  }

  let genreList = data.genre_ids.map((id) => {
    const label = genres.find((g) => g.id === id);
    return label.name;
  });

  if (genreList.length > 0) {
    genresText = genreList.join(', ');
  }

  if (isSelected) {
    const popularity = Math.round(data.popularity, 0);
    const backgroundImage = buildImageUrl(configuration, data.poster_path, 5);
    let dateString = 'N/A';

    if (
      typeof data.release_date !== 'undefined' &&
      data.release_date.length > 0
    ) {
      const releaseDate = new Date(data.release_date);
      const date = releaseDate.getDate();
      const month = releaseDate.getMonth() + 1;
      const year = releaseDate.getFullYear();
      dateString = `${date}/${month}/${year}`;
    }

    overview = (
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
              {overview}
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
