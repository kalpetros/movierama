import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Movie } from '../../src/movies/Movie';
import { ConfigurationContext } from '../../src/store/ConfigurationContext';
import { GenreContext } from '../../src/store/GenreContext';

describe('<Movies />', () => {
  let wrapper;

  it('should match the snapshot', () => {
    const mockConfigurationContext = {
      state: {
        poster_sizes: ['w500', 'w780', 'original'],
        secure_base_url: 'https://image.tmdb.org/t/p/',
      },
    };
    const mockGenreContext = {
      state: [
        {
          id: 28,
          name: 'Action',
        },
      ],
    };
    const mockData = {
      genre_ids: [28],
      id: 619592,
      overview: 'Test overview',
      popularity: 50,
      poster_path: '/ucktgbaMSaETUDLUBp1ubGD6aNj.jpg',
      release_date: '2020-07-02',
      title: 'Test title',
      vote_average: 5,
    };

    wrapper = mount(
      <ConfigurationContext.Provider value={mockConfigurationContext}>
        <GenreContext.Provider value={mockGenreContext}>
          <Movie data={mockData} />
        </GenreContext.Provider>
      </ConfigurationContext.Provider>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
