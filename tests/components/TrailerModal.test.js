import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { TrailerModal } from '../../src/components/TrailerModal';

configure({ adapter: new Adapter() });

describe('<TrailerModal />', () => {
  const container = global.document.createElement('div');
  container.setAttribute('id', 'modal');
  const body = global.document.querySelector('body');
  body.appendChild(container);

  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<TrailerModal />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should set the state on button click', () => {
    wrapper.find('.button-icon').first().props().onClick();
    expect(setState).toHaveBeenCalledTimes(0);
  });
});
