import defaultImage from '../src/assets/default.jpeg';

export const buildImageUrl = (configuration, path, size) => {
  let imageUrl;

  try {
    const secureBaseUrl = configuration.secure_base_url;
    const posterSizes = configuration.poster_sizes;
    const posterSize = posterSizes[size];

    if (secureBaseUrl && posterSize && path) {
      imageUrl = `${secureBaseUrl}${posterSize}${path}`;
    } else {
      imageUrl = defaultImage;
    }
  } catch {
    imageUrl = defaultImage;
  }

  return imageUrl;
};

export const buildEndpoint = (value, options) => {
  const expectedOptions = {
    now_playing: ['page'],
    search: ['page', 'query'],
    movie: ['id'],
    reviews: ['id'],
    similar: ['id'],
    videos: ['id'],
  };

  if (expectedOptions[value]) {
    const passedOptions = Object.keys(options);
    const valid = expectedOptions[value].every((option) =>
      passedOptions.includes(option)
    );

    if (!valid)
      throw new Error(
        `Endpoint ${value} should have the followng options [${expectedOptions[
          value
        ].join(', ')}]`
      );
  }

  const apiKey = '?api_key=bc50218d91157b1ba4f142ef7baaa6a0';
  const url = 'https://api.themoviedb.org/3/';
  const language = '&language=en-US';
  let endpoint;

  switch (value) {
    case 'now_playing':
      endpoint = `${url}movie/now_playing${apiKey}${language}&page=${options.page}`;
      break;
    case 'search':
      endpoint = `${url}search/movie${apiKey}${language}&page=${options.page}&query=${options.query}`;
      break;
    case 'movie':
      endpoint = `${url}movie/${options.id}${apiKey}`;
      break;
    case 'reviews':
      endpoint = `${url}movie/${options.id}/reviews${apiKey}`;
      break;
    case 'similar':
      endpoint = `${url}movie/${options.id}/similar${apiKey}`;
      break;
    case 'videos':
      endpoint = `${url}movie/${options.id}/videos${apiKey}`;
      break;
    case 'configuration':
      endpoint = `${url}configuration${apiKey}`;
      break;
    case 'genres':
      endpoint = `${url}genre/movie/list${apiKey}`;
      break;
    default:
      endpoint = null;
  }

  return endpoint;
};
