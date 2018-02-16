import React, {Component} from 'react';
import MainNav from './MainNav';
import Content from './Content';

export default class Main extends Component {
  render() {
    return (
      <div>
        <MainNav/>
        <Content/>
      </div>
    );
  }
}
