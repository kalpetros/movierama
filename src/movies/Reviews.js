import React, { useState, useEffect } from 'react';

export const Reviews = (props) => {
  const [data, setData] = useState([]);
  const { id: id } = props;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
    const endpoint = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`;

    fetch(endpoint, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
