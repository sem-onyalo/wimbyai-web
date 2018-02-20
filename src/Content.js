import React, {Component} from 'react';
import Discussion from './Discussion';
import Projects from './Projects';

export default class Content extends Component {
    render() {
        switch(this.props.page) {
            case 1:
                return <Projects/>;

            case 2:
                return <Discussion/>;

            default:
                return <div>Error loading page content</div>;
        }
    }
}