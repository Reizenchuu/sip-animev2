import React from 'react';
import { BrowserRouter as Router, withRouter, Redirect } from 'react-router-dom';

class SearchService extends React.Component {
	constructor(props) {
		super();
		this.state = { value: '', searching: false, redirect: null };
		this.handleChange = this.handleChange.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
	}

	//on search bar click we replace the current route with the search route
	//if current path is not /search we redirect; else we do nothing
	onClickHandler() {
		const currentPath = this.props.location.pathname;
		if (String(currentPath).includes('/search')) return;
		this.setState({ redirect: '' });
		if (this.state.value !== '') {
			this.setState({ redirect: '/search?value=' + this.state.value });
			return;
		}
		this.setState({ redirect: '/search' });
	}

	handleChange(event) {
		this.setState({
			value: event.target.value,
			redirect: '/search?value=' + event.target.value
		});
	}

	//once we redirect to search route we empty the redirect state
	//so that the onlickhandler would rerender the comp when setting a state
	//with the same value
	componentDidUpdate(props) {
		const currentPath = this.props.location.pathname;
		if (String(currentPath).includes('/search') && !(this.state.redirect === '')) {
			this.setState({ redirect: '' });
		}
	}

	render() {
		//right now, a conditional redirect tag is not necessary considering the comp doesn't
		//rerender if we're still in the search route; but just in case, we leave it there.
		const redirectTag = String(this.state.redirect).includes('/search') ? (
			<Redirect to={this.state.redirect} />
		) : null;

		const isPhone = this.props.isPhone;
		return isPhone ? (
			<div id="search-mobile-nav-pro">
				{redirectTag}
				<input
					className="mobile-search-bar"
					type="text"
					placeholder="Search for Movies or TV Series"
					aria-label="Search"
					value={this.state.value}
					onClick={this.onClickHandler}
					onChange={this.handleChange}
				/>
			</div>
		) : (
			<div>
				{redirectTag}
				<div id="search-icon-more" />
				<input
					type="text"
					placeholder="Search for Movies or TV Series"
					aria-label="Search"
					value={this.state.value}
					onClick={this.onClickHandler}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

export default withRouter(SearchService);
