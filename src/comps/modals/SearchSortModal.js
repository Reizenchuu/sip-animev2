import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchSortModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			sortBy: [
				'Recent uploads',
				'Old uploads',
				'Highest Ratings',
				'Lowest ratings',
				'Newest',
				'Oldest',
				'Alphabetical A-Z',
				'Alphabetical Z-A'
			],
			selectedSort: null
		};
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleTagClick = this.handleTagClick.bind(this);
	}

	applyOptions() {
		//we call props method that handles this part
		//we send the selectedTags array in the method
	}

	handleCloseModal() {
		//this.resetOptions();
		this.props.handleCloseModal();
	}

	handleTagClick() {}

	render() {
		const SortOptions = this.state.sortBy;
		const sortList = SortOptions.map(function(option, i) {
			return (
				<option key={i} value={option}>
					{option}
				</option>
			);
		});
		return (
			<div className="modal" id="sort-search-options" style={this.props.modalShow ? { display: 'block' } : null}>
				{sortList}
			</div>
		);
	}
}
