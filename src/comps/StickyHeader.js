import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import SearchService from './SearchService';

export default function StickyHeader() {
	return (
		<header id="videohead-pro" className="sticky-header">
			<div id="video-logo-background">
				<NavLink exact to="/">
					<img src={require('../assets/css/images/logo-video-layout.png')} alt="Logo" />
				</NavLink>
			</div>

			<div className="clearfix">
				<div id="video-search-header">
					<SearchService isPhone={false} />
				</div>

				<div id="mobile-bars-icon-pro" className="noselect">
					<i className="fas fa-bars" />
				</div>
			</div>

			<nav id="mobile-navigation-pro">
				<SearchService isPhone={true} />
				<ul id="mobile-menu-pro">
					<li className="current-menu-item">
						<NavLink exact to="/" activeClassName="current-menu-item">
							<span className="icon-Old-TV" />
							Home
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/trending" activeClassName="current-menu-item">
							<span className="icon-Reel" />
							Trending
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/browse" activeClassName="current-menu-item">
							<span className="icon-Movie" />
							Browse
						</NavLink>
					</li>
					<li>
						<NavLink to="/series" activeClassName="current-menu-item">
							<span className="icon-Movie-Ticket" />
							Random
						</NavLink>
					</li>
					<li>
						<NavLink exact to="/contact" activeClassName="current-menu-item">
							<span className="icon-Clock" />
							Contact us
						</NavLink>
					</li>
				</ul>
				<div className="clearfix" />
			</nav>
		</header>
	);
}
