import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Layout } from '../../src/components/Layout';

describe('<Layout />', () => {
  let wrapper;

  beforeEach(() => {
    const children = <p>Test</p>;

    wrapper = shallow(<Layout>{children}</Layout>);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
