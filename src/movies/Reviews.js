import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { buildEndpoint } from '../utils';

export const Reviews = (props) => {
  const [data, setData] = useState([]);
  const { id: id } = props;
  const endpoint = buildEndpoint('reviews', { id: id });

  useEffect(() => {
    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status !== 200) throw new Error(response.status);
        return response.json();
      })
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [endpoint]);

  const list = data.slice(0, 2).map((review, index) => {
    const author = review.author;
    const content = review.content;

    return (
      <div key={`review-${index}`}>
        <h3>{author}</h3>
        <p>{content}</p>
      </div>
    );
  });

  return (
    <div className="movie__details__meta">
      <h2>Reviews</h2>
      {list.length > 0 ? list : <p>There are no available reviews.</p>}
    </div>
  );
};

Reviews.defaultProps = {
  id: 1,
};

Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};
