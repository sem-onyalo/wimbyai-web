import React, { Component } from 'react';
import Config from './Config';
import load from 'little-loader';
import ProjectSidebar from './ProjectSidebar';
import './Projects.css';

class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapHeight: this.getViewportHeight(),
            mapRegion: this.getMapRegion(),
            projectMapsLoading: false,
            currentProject: undefined
        };

        this._mainNavHeight = 56;
        this.updateMapDimensions = this.updateMapDimensions.bind(this);
        this.loadProjectsMapCallback = this.loadProjectsMapCallback.bind(this);
        this.handleProjectMarkerClick = this.handleProjectMarkerClick.bind(this);
        this.handleCloseSidebarClick = this.handleCloseSidebarClick.bind(this);
    }

    render() {
        var projectsMapClass = this.state.currentProject ? 'projects-map sidebar-show' : 'projects-map';

        if (this.state.currentProject) {
            return (
                <div>
                    <div id="projectsMap" className={projectsMapClass}></div>
                    <ProjectSidebar currentProject={this.state.currentProject}
                        handleCloseSidebarClick={this.handleCloseSidebarClick} />
                </div>
            );
        }

        return (<div id="projectsMap" className={projectsMapClass}></div>);
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

    getProjects() {
        // TODO: pull projects from datasource
        var projects = [
            {
                id: 1,
                position: { lat: 43.787476, lng: -79.275253 },
                name: '23 and 25 Glen Watford Drive Land Development Project',
                developer: 'James Development Corp',
                planner: 'James Jones',
                applicationDate: 'Feb 22, 2018',
                description: '23 storey high rise development'
            },
            // {
            //     id: 2,
            //     name: 'First Parliment Development Project',
            //     position: { lat: 43.651937, lng: -79.363606 }
            // }
        ];

        return projects;
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

        var projects = this.getProjects();

        for (var i = 0; i < projects.length; i++) {
            var marker = new googleMaps.Marker({
                map: map,
                position: projects[i].position,
                projectIndex: i
            });

            var infoWindow = new googleMaps.InfoWindow({
                content: `<div id="infoWindow${projects[i].id}">${projects[i].name}</div>`
            });

            marker.addListener('click', (e) => {
                infoWindow.open(map, marker);
                this.handleProjectMarkerClick();
            });
        }
    }

    handleProjectMarkerClick() {
        var projects = this.getProjects();
        this.setState({
            // TODO: get index from state
            currentProject: projects[0]
        });
    }

    handleCloseSidebarClick() {
        this.setState({
            currentProject: undefined
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
            if (window.projectMapsLoading) {
                this.waitForGoogleAPI();
            } else {
                window.projectMapsLoading = true;
                var apiKey = Config.mapApiKey;
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

export default Projects;