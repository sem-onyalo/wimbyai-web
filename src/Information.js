import React, { Component } from 'react';
import HttpClient from './util/http-client';
import './Information.css';

export default class Information extends Component {
    constructor(props) {
        super(props);

        this.state = {
          searchResults: '',
          searchText: ''
        };

        this._httpClient = new HttpClient();

        this.searchDocuments = this.searchDocuments.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    }

    async searchDocuments(searchText) {
        let searchTextEncoded = encodeURI(searchText);
        let uri = `https://wimbyai-search-test.search.windows.net/indexes/document/docs?search=${searchTextEncoded}&api-version=2016-09-01`;
        
        var resp = await this._httpClient.request(uri, 'GET', {
            'Content-Type': 'application/json',
            'api-key': '5E7DE477355A05A9DB6731B43C277279'
        });

        var data = JSON.parse(resp);
        
        this.setState({
            searchResults: data.value[0].summary
        });
    }

    handleSearchTextChange(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSearchButtonClick() {
        this.searchDocuments(this.state.searchText);
    }

    render() {
        let answer = (<p>{this.state.searchResults}</p>);
        if (this.state.searchResults != '') {
            answer = (
                <div>
                    <br />
                    <h5>Answer</h5>
                    <p>{this.state.searchResults}</p>
                    <div className="row learn-more">
                        <div className="col-sm-5 left"><a href="">Learn more about this project</a></div>
                        <div className="col-sm-2 sep">-</div>
                        <div className="col-sm-5 right"><a href="">Learn more about noise guidelines</a></div>
                    </div>
                </div>
            );
        }

        return (
            <div className="container information-container">
                {/* <div className="projects-wrapper">
                    <div className="title">Projects</div>
                    <select >
                        <option value="1">23 and 25 Glen Watford Drive Land Development Project</option>
                    </select>
                </div> */}
                <h3>23 and 25 Glen Watford Drive Land Development Project</h3>
                <h5 className="project-summary">Summary</h5>
                <p>
                    Developer: James Development Corp<br />
                    Planner on File: James Jones<br />
                    Date of Application: Feb 22, 2018<br />
                    Project: 23 storey high rise development<br />
                </p>
                <br />
                <div className="question-wrapper">
                    <input type="text" placeholder="Ask a question..." onChange={this.handleSearchTextChange} />
                    <input type="button" value="Search" onClick={this.handleSearchButtonClick} />
                </div>
                <br />
                {answer}
            </div>
        );
    }
}