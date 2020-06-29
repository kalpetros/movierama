import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Movies } from '../../src/movies/main';
import { MoviesContext } from '../../src/store/movies/context';

describe('<Movies />', () => {
  let wrapper;

  it('should match the snapshot', () => {
    const mockContext = {
      movies: [],
      query: '',
      setQuery: jest.fn(),
    };

    wrapper = mount(
      <MoviesContext.Provider value={mockContext}>
        <Movies />
      </MoviesContext.Provider>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
