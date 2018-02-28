import React, { Component } from 'react';
import MainNav from './MainNav';
import Content from './Content';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 2
    };

    this.handleMainNavButtonClick = this.handleMainNavButtonClick.bind(this);
  }
  render() {
    return (
      <div>
        <MainNav page={this.state.currentPage} onButtonClick={this.handleMainNavButtonClick}/>
        <Content page={this.state.currentPage}/>
      </div>
    );
  }

  handleMainNavButtonClick(args) {
    this.setState({
      currentPage: args.newPage
    });
  }
}