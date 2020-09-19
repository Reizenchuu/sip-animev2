import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

export default class SideBar extends React.Component {
	constructor(props) {
		super();
		this.state = { path: '.' };
		this.setCurrentPath = this.setCurrentPath.bind(this);
	}

	setCurrentPath(path) {
		if (this.state.path === path) return;
		this.setState({ path });
	}

	render() {
		const currentPath = this.state.path;
		return (
			<nav id="sidebar-nav">
				<ul id="vertical-sidebar-nav" className="sf-menu">
					<li className="normal-item-pro">
						<NavLink exact to="/" activeClassName="current-menu-item">
							<span className="icon-Movie" />Home
						</NavLink>
					</li>
					<li className="normal-item-pro">
						<NavLink exact to="/trending" activeClassName="current-menu-item">
							Trending
						</NavLink>
					</li>
					<li className="normal-item-pro">
						<NavLink exact to="/browse" activeClassName="current-menu-item">
							Browse
						</NavLink>
					</li>
					<li className="normal-item-pro">
						<NavLink to="/series" activeClassName="current-menu-item">
							Random
						</NavLink>
					</li>
					<li className="normal-item-pro">
						<NavLink exact to="/contact" activeClassName="current-menu-item">
							Contact us
						</NavLink>
					</li>
				</ul>
				<div className="clearfix" />
			</nav>
		);
	}
}
