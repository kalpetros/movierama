import { buildImageUrl } from '../src/utils';

describe('buildImageUrl', () => {
  const configuration = {
    secure_base_url: 'movierama.com/',
    poster_sizes: [1, 2, 3, 4],
  };
  const path = '/test_path';

  it('should return the complete url', () => {
    const imageUrl = buildImageUrl(configuration, path, 2);
    expect(imageUrl).toBe('movierama.com/3/test_path');
  });

  it('should return correctly given an empty configuration', () => {
    const imageUrl = buildImageUrl({}, path, 2);
    expect(imageUrl).toBeDefined();
  });

  it('should return correctly given an undefined configuration', () => {
    const imageUrl = buildImageUrl(undefined, path, 2);
    expect(imageUrl).toBeDefined();
  });

  it('should return correctly given an empty path', () => {
    const imageUrl = buildImageUrl(configuration, '', 2);
    expect(imageUrl).toBeDefined();
  });

  it('should return correctly given an undefined path', () => {
    const imageUrl = buildImageUrl(configuration, undefined, 2);
    expect(imageUrl).toBeDefined();
  });

  it('should return correctly given a null path', () => {
    const imageUrl = buildImageUrl(configuration, null, 2);
    expect(imageUrl).toBeDefined();
  });

  it('should return correctly given a size that does not exist', () => {
    const imageUrl = buildImageUrl(configuration, path, 5);
    expect(imageUrl).toBeDefined();
  });
});
