import { buildImageUrl } from '../src/utils';

const configuration = {
  secure_base_url: 'movierama.com/',
  poster_sizes: [1, 2, 3, 4],
};
const path = '/test_path';

test('Get image url', () => {
  const imageUrl = buildImageUrl(configuration, path, 2);
  expect(imageUrl).toBe('movierama.com/3/test_path');
});

test('Pass empty configuration', () => {
  const imageUrl = buildImageUrl({}, path, 2);
  expect(imageUrl).toBeNull();
});

test('Pass undefined configuration', () => {
  const imageUrl = buildImageUrl(undefined, path, 2);
  expect(imageUrl).toBeNull();
});

test('Pass empty path', () => {
  const imageUrl = buildImageUrl(configuration, '', 2);
  expect(imageUrl).toBeNull();
});

test('Pass undefined path', () => {
  const imageUrl = buildImageUrl(configuration, undefined, 2);
  expect(imageUrl).toBeNull();
});

test('Pass null path', () => {
  const imageUrl = buildImageUrl(configuration, null, 2);
  expect(imageUrl).toBeNull();
});

test('Pass incorrect size', () => {
  const imageUrl = buildImageUrl(configuration, path, 5);
  expect(imageUrl).toBeNull();
});
