import React from 'react';
import Main from './Main';
import MainNav from './MainNav';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('Main', () => {
    it('should render MainNav', () => {
        let wrapper = shallow(<Main/>);
        expect(wrapper.containsAllMatchingElements([<MainNav/>])).to.equal(true);
    });
});