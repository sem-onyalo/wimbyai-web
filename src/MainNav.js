import React, {Component} from 'react';

export default class MainNav extends Component {
    render() {
      return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="#">WimbyAI</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavBar" aria-controls="mainNavBar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavBar">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active"><a className="nav-link" href="#">Projects</a></li>
            </ul>
          </div>
        </nav>
      );
    }
  }