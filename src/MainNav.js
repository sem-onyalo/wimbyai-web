import React, {Component} from 'react';

export default class MainNav extends Component {
    constructor(props) {
      super(props);

      this.handleNavBarClick = this.handleNavBarClick.bind(this);
    }
    render() {
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="#">WimbyAI <sup>BETA</sup></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavBar">
            <ul className="navbar-nav mr-auto">
              <li className={this.props.page == 1 ? "nav-item active" : "nav-item"}><a className="nav-link" href="#" onClick={() => this.handleNavBarClick(1)}>Projects</a></li>
              <li className={this.props.page == 2 ? "nav-item active" : "nav-item"}><a className="nav-link" href="#" onClick={() => this.handleNavBarClick(2)}>Information</a></li>
            </ul>
          </div>
        </nav>
      );
    }

    handleNavBarClick(page) {
      this.props.onButtonClick({
        newPage: page
      });
    }
  }