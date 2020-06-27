import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Reviews } from '../../src/movies/Reviews';

describe('<Reviews />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Reviews />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
