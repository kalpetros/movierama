export const buildEndpoint = (query, page) => {
  const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
  const baseEndpoint = 'https://api.themoviedb.org/3/';
  const language = '&language=en-US';
  const nowPlayingEndpoint = `${baseEndpoint}movie/now_playing?api_key=${apiKey}${language}&page=`;
  const searchMovieEndpoint = `${baseEndpoint}search/movie?api_key=${apiKey}${language}&page=`;

  let endpoint = `${nowPlayingEndpoint}${page}`;

  if (query.length > 0) {
    endpoint = `${searchMovieEndpoint}${page}&query=${query}`;
  }

  return endpoint;
};

export const fetchMovies = (prevData, endpoint, callback) => {
  fetch(endpoint, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status !== 200) throw new Error(response.status);
      return response.json();
    })
    .then((newData) => {
      callback({
        init: false,
        page: prevData.page,
        pages: newData.total_pages,
        results: [...prevData.results, ...newData.results],
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
