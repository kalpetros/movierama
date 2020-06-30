import { buildEndpoint } from '../src/utils';
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
    expect(imageUrl).toBe('file-mock');
  });

  it('should return correctly given an undefined configuration', () => {
    const imageUrl = buildImageUrl(undefined, path, 2);
    expect(imageUrl).toBe('file-mock');
  });

  it('should return correctly given an empty path', () => {
    const imageUrl = buildImageUrl(configuration, '', 2);
    expect(imageUrl).toBe('file-mock');
  });

  it('should return correctly given an undefined path', () => {
    const imageUrl = buildImageUrl(configuration, undefined, 2);
    expect(imageUrl).toBe('file-mock');
  });

  it('should return correctly given a null path', () => {
    const imageUrl = buildImageUrl(configuration, null, 2);
    expect(imageUrl).toBe('file-mock');
  });

  it('should return correctly given a size that does not exist', () => {
    const imageUrl = buildImageUrl(configuration, path, 5);
    expect(imageUrl).toBe('file-mock');
  });
});

describe('buildEndpoint', () => {
  const testKey = 'bc50218d91157b1ba4f142ef7baaa6a0';
  const url = 'https://api.themoviedb.org/3/';
  const language = '&language=en-US';

  it('should return null', () => {
    const endpoint = buildEndpoint('test');
    expect(endpoint).toBeNull();
  });

  it('should throw an error given the wrong options', () => {
    expect(() => buildEndpoint('now_playing', { order: 1 })).toThrow();
  });

  it('should return the correct now_playing endpoint', () => {
    const endpoint = buildEndpoint('now_playing', { page: 1 });
    expect(endpoint).toBe(
      `${url}movie/now_playing?api_key=${testKey}${language}&page=1`
    );
  });

  it('should return the correct search endpoint', () => {
    const endpoint = buildEndpoint('search', { query: 'test', page: 1 });
    expect(endpoint).toBe(
      `${url}search/movie?api_key=${testKey}${language}&page=1&query=test`
    );
  });

  it('should return the correct search endpoint', () => {
    const endpoint = buildEndpoint('search', { query: 'test', page: 1 });
    expect(endpoint).toBe(
      `${url}search/movie?api_key=${testKey}${language}&page=1&query=test`
    );
  });

  it('should return the correct movie details endpoint', () => {
    const endpoint = buildEndpoint('movie', { id: 1 });
    expect(endpoint).toBe(`${url}movie/1?api_key=${testKey}`);
  });

  it('should return the correct reviews endpoint', () => {
    const endpoint = buildEndpoint('reviews', { id: 1 });
    expect(endpoint).toBe(`${url}movie/1/reviews?api_key=${testKey}`);
  });

  it('should return the correct videos endpoint', () => {
    const endpoint = buildEndpoint('videos', { id: 1 });
    expect(endpoint).toBe(`${url}movie/1/videos?api_key=${testKey}`);
  });

  it('should return the correct configuration endpoint', () => {
    const endpoint = buildEndpoint('configuration');
    expect(endpoint).toBe(`${url}configuration?api_key=${testKey}`);
  });

  it('should return the correct genres endpoint', () => {
    const endpoint = buildEndpoint('genres');
    expect(endpoint).toBe(`${url}genre/movie/list?api_key=${testKey}`);
  });
});
