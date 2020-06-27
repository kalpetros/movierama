import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { SimilarMovies } from '../../src/movies/SimilarMovies';

describe('<SimilarMovies />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SimilarMovies />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
