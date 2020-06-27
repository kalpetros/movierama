import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Trailers } from '../../src/movies/Trailers';

describe('<Trailers />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Trailers />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
