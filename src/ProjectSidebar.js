import React, { Component } from 'react';
import './ProjectSidebar.css';

class ProjectSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: '',
            searchText: ''
        };

        this.searchDocuments = this.searchDocuments.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.handleCloseSidebarClick = this.handleCloseSidebarClick.bind(this);
    }

    async searchDocuments(searchText) {
        
    }

    handleSearchTextChange(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSearchButtonClick() {
        this.searchDocuments(this.state.searchText);
    }

    handleCloseSidebarClick() {
        this.props.handleCloseSidebarClick();
    }

    render() {
        let answer = (<p>{this.state.searchResults}</p>);
        if (this.state.searchResults != '') {
            answer = (
                <div>
                    <br />
                    <h5>Answer</h5>
                    <p>{this.state.searchResults}</p>
                </div>
            );
        }

        return (
            <div className="project-sidebar">
                <i class="fas fa-chevron-left" onClick={this.handleCloseSidebarClick}></i>
                <h3>{this.props.currentProject.name}</h3>
                <h5 className="project-summary">Summary</h5>
                <p>
                    Developer: {this.props.currentProject.developer}<br />
                    Planner on File: {this.props.currentProject.planner}<br />
                    Date of Application: {this.props.currentProject.applicationDate}<br />
                    Project: {this.props.currentProject.description}<br />
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

export default ProjectSidebar;
