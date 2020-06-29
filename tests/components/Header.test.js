import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Header } from '../../src/components/Header';
import { MoviesContext } from '../../src/store/movies/context';

describe('<Header />', () => {
  let wrapper;

  it('should match the snapshot', () => {
    const mockContext = {
      movies: [],
      query: 'Test',
      setQuery: jest.fn(),
    };

    wrapper = mount(
      <MoviesContext.Provider value={mockContext}>
        <Header />
      </MoviesContext.Provider>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should display movie title text', () => {
    const mockContext = {
      movies: [],
      query: 'Test',
      setQuery: jest.fn(),
    };

    wrapper = mount(
      <MoviesContext.Provider value={mockContext}>
        <Header />
      </MoviesContext.Provider>
    );

    const title = wrapper.find('.header__title').find('h1').text();
    expect(title).toBe('Movies "Test"');
  });

  it('should display in theaters text', () => {
    const mockContext = {
      movies: [],
      query: '',
      setQuery: jest.fn(),
    };

    wrapper = mount(
      <MoviesContext.Provider value={mockContext}>
        <Header />
      </MoviesContext.Provider>
    );

    const title = wrapper.find('.header__title').find('h1').text();
    expect(title).toBe('In Theaters');
  });
});
