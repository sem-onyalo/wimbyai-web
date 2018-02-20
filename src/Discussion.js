import React, { Component } from 'react';
import './Discussion.css';

export default class Discussion extends Component {
    render() {
        return (
            <div className="container-fluid discussion-container">
                <h4>Project</h4>
                <select className="form-control">
                    <option value="1">23 and 25 Glen Watford Drive Land Development Project</option>
                </select>
                <br />
                <input type="text" className="form-control" placeholder="Ask a question..." />
            </div>
        );
    }
}