import React from 'react';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { SimilarMovies } from '../../src/movies/SimilarMovies';

describe('<SimilarMovies />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SimilarMovies />);
  });

  it('It has 2 elements', () => {
    const className = wrapper.find('.movie__details__meta');
    expect(className.props().children.length).toBe(2);
  });

  it('It has the correct header text', () => {
    const text = wrapper.find('h2').text();
    expect(text).toBe('Similar Movies');
  });

  it('It has the correct content text', () => {
    const text = wrapper.find('p').text();
    expect(text).toBe('We could not find any similar movies.');
  });
});
