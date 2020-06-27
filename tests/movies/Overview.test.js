import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Overview } from '../../src/movies/Overview';

describe('<Overview />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Overview />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
