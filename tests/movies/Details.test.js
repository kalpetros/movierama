import React from 'react';
import { configure, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Details } from '../../src/movies/Details';

describe('<Details />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Details />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should change class on menu item click', () => {
    let li = wrapper.find('.movie__details__menu').find('ul').childAt(1);
    const event = {
      currentTarget: {
        dataset: { id: 'reviews' },
      },
    };
    li.simulate('click', event);
    li = wrapper.find('.movie__details__menu').find('ul').childAt(1);
    expect(li.props().className).toBe('movie__details__menu--selected');
  });
});
