import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { SimilarMovies } from '../../src/movies/SimilarMovies';

test('test', () => {
  const wrapper = shallow(<SimilarMovies />);
});
