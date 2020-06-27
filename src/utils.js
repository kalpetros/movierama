import defaultImage from '../src/assets/default.jpeg';

export const buildImageUrl = (configuration, path, size) => {
  let imageUrl = null;

  if (
    typeof configuration === 'undefined' ||
    Object.keys(configuration).length === 0
  ) {
    return defaultImage;
  }

  if (typeof path === 'undefined' || path === null || path.length === 0) {
    return defaultImage;
  }

  const baseUrl = configuration.secure_base_url;
  const posterSize = configuration.poster_sizes[size];

  if (typeof posterSize === 'undefined') {
    return defaultImage;
  }

  if (path) {
    imageUrl = `${baseUrl}${posterSize}${path}`;
  }

  return imageUrl;
};
