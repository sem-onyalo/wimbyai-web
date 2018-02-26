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
                    <h4>Answer</h4>
                    <p>{this.state.searchResults}</p>
                </div>
            );
        }

        return (
            <div className="container information-container">
                <h4>Project</h4>
                <select className="form-control">
                    <option value="1">23 and 25 Glen Watford Drive Land Development Project</option>
                </select>
                <br />
                <input type="text" className="form-control" placeholder="Ask a question..." onChange={this.handleSearchTextChange} />
                <br />
                <input type="button" className="btn btn-primary" value="Search" onClick={this.handleSearchButtonClick} />
                {answer}
            </div>
        );
    }
}