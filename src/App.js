import React from 'react';
import SideBarMenu from './comps/SideBarMenu';
import StickyHeader from './comps/StickyHeader';
import 'semantic-ui-css/semantic.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/icons/fontawesome/css/fontawesome-all.min.css';
import './assets/css/icons/Iconsmind__Ultimate_Pack/Line icons/styles.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingRoute from './routes/LandingRoute';
import BrowseRoute from './routes/BrowseRoute';
import ContactRoute from './routes/ContactRoute';
import SeriesRoute from './routes/SeriesRoute';
import TrendingRoute from './routes/TrendingRoute';
import SearchRoute from './routes/SearchRoute';

function App() {
	return (
		<div className="App">
			<Router>
				<div id="sidebar-bg">
					<StickyHeader />
					<SideBarMenu />
				</div>

				<Switch>
					<Route exact path="/">
						<LandingRoute />
					</Route>
					<Route exact path="/trending">
						<TrendingRoute />{' '}
					</Route>
					<Route exact path="/search">
						{' '}
						<SearchRoute />{' '}
					</Route>
					<Route exact path="/browse">
						{' '}
						<BrowseRoute />{' '}
					</Route>

					<Route exact path="/contact">
						{' '}
						<ContactRoute />
					</Route>
					<Route exact path="/series">
						{' '}
						<SeriesRoute />{' '}
					</Route>
					<Route exact path="*">
						<LandingRoute />
					</Route>
					<Route exact path="/terms" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
