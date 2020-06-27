export const buildImageUrl = (configuration, path, size) => {
  if (Object.keys(configuration).length === 0) {
    return null;
  }

  if (path.length === 0) {
    return null;
  }

  const baseUrl = configuration.secure_base_url;
  const posterSize = configuration.poster_sizes[size];

  if (typeof posterSize === 'undefined') {
    return null;
  }

  let imageUrl = null;

  if (path) {
    imageUrl = `${baseUrl}${posterSize}${path}`;
  }

  return imageUrl;
};
