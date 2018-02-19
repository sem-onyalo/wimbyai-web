import React, {
    Component
} from 'react';
import load from 'little-loader';
import './Projects.css';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapHeight: this.getViewportHeight(),
            mapRegion: this.getMapRegion(),
            projectMapsLoading: false
        };

        this._mainNavHeight = 56;
        this.updateMapDimensions = this.updateMapDimensions.bind(this);
        this.loadProjectsMapCallback = this.loadProjectsMapCallback.bind(this);
    }

    render() {
        var mapStyle = {
            height: this.state.mapHeight + 'px'
        };

        return (<div id="projectsMap" className="projects-map"></div>);
    }

    getMapRegion() {
        // TODO: pull from datasource or drop down menu selected by user
        return {
            lat: 43.6532,
            lng: -79.3832
        }; // Toronto, ON
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
        this.setState({
            mapHeight: this.getViewportHeight() - this._mainNavHeight
        });
    }

    loadProjectsMapCallback(googleMaps) {
        document.getElementById('projectsMap').style.height = this.state.mapHeight + 'px';
        
        var map = new googleMaps.Map(document.getElementById('projectsMap'), {
            center: this.state.mapRegion,
            zoom: 10
        });

        // TODO: pull marker locations from datasource
        var marker = new googleMaps.Marker({
            map: map,
            position: { lat: 43.787476, lng: -79.275253 } // 23 and 25 Glen Watford Drive Land Development Project
        });

        marker = new googleMaps.Marker({
            map: map,
            position: { lat: 43.651937, lng: -79.363606 } // First Parliment Development Project
        });
    }

    waitForGoogleAPI() {
        setTimeout(() => {
            if (!window.projectMapsLoading) {
                this.loadProjectsMapCallback(window.google.maps);
            }
        }, 300);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateMapDimensions);

        if (typeof window.google === 'undefined') {
            // TODO: move to config file
            const apiKey = 'AIzaSyAgISl38x3fEnLXxn_2VYumF9b9RsPFVHQ';

            if (window.projectMapsLoading) {
                this.waitForGoogleAPI();
            } else {
                window.projectMapsLoading = true;
                load(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`, (err) => {
                    if (!err) {
                        window.projectMapsLoading = false;
                        this.loadProjectsMapCallback(window.google.maps);
                    }
                });
            }
        } else {
            this.loadProjectsMapCallback(window.google.maps);
        }
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.updateMapDimensions);
    }
}