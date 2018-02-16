import React from 'react';
import Main from './Main';
import MainNav from './MainNav';
import Content from './Content';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('Main', () => {
    it('should render MainNav', () => {
        let wrapper = shallow(<Main/>);
        expect(wrapper.containsAllMatchingElements([<MainNav/>])).to.equal(true);
    });

    it('should render Content', () => {
        let wrapper = shallow(<Main/>);
        expect(wrapper.containsAllMatchingElements([<Content/>])).to.equal(true);
    });
});