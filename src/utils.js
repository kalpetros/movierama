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
