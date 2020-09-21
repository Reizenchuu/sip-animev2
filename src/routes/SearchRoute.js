import React from 'react';
import ReactDOM from 'react-dom';
import SearchService from '../comps/SearchService';
import SearchConfig from '../comps/SearchConfig';

export default class SearchRoute extends React.Component {
	render() {
		return (
			<main id="col-main">
				<SearchService isPhone={true} />

				<SearchConfig />
			</main>
		);
	}
}
