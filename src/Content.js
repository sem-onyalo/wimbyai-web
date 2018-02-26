import React, {Component} from 'react';
import Information from './Information';
import Projects from './Projects';

export default class Content extends Component {
    render() {
        switch(this.props.page) {
            case 1:
                return <Projects/>;

            case 2:
                return <Information/>;

            default:
                return <div>Error loading page content</div>;
        }
    }
}