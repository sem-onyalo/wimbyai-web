import React, {Component} from 'react';
import './Projects.css';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapHeight: this.getViewportHeight(),
            mapRegion: this.getMapRegion()
        };

        this._mainNavHeight = 56;
        this._mapUrl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyAgISl38x3fEnLXxn_2VYumF9b9RsPFVHQ';
        this.updateMapDimensions = this.updateMapDimensions.bind(this);
    }

    render() {
        var mapStyle = {
            height: this.state.mapHeight + 'px'
        };

        var mapUrl = this._mapUrl + "&q=" + this.state.mapRegion;

        return (
            <iframe 
                src={mapUrl}
                className="projects-map"
                marginHeight="0"
                marginWidth="0"
                frameBorder="0"
                scrolling="no"
                style={mapStyle}>Loading map...</iframe>
        );
    }

    getMapRegion() {
        // TODO: pull from datasource or drop down menu selected by user
        return "Toronto+ON";
    }

    getViewportHeight() {
        var w = window,
            d = document,
            e = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            height = w.innerHeight || e.clientHeight || body.clientHeight;

        return height;
    }

    updateMapDimensions() {
        this.setState({ mapHeight: this.getViewportHeight() - this._mainNavHeight });
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateMapDimensions);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.updateMapDimensions);
    }
}