import React from 'react';
import SearchTagModal from './modals/SearchTagsModal';
import SearchStudioModal from './modals/SearchStudioModal';
import SearchSortModal from './modals/SearchSortModal';

export default class SearchConfig extends React.Component {
	constructor() {
		super();
		this.state = { tagsModalShow: false, studioModalShow: false, sortModalShow: false };
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal(modalName) {
		const modalVisibility = Object.values(this.state);
		if (modalVisibility.includes(true)) return;
		this.setState({ [modalName]: true });
	}

	handleCloseModal(modalName) {
		//this.setState({ [modalName]: false });
	}

	render() {
		return (
			<div>
				<div className="vertical-flex sf-menu search-config" id="video-search-header-filtering-padding">
					<div className="search-config-item" onClick={() => this.handleOpenModal('tagsModalShow')}>
						<span className="icon-Movie" />Tags
					</div>
					<div className="search-config-item" onClick={() => this.handleOpenModal('studioModalShow')}>
						<span className="icon-Movie" />Studios
					</div>
					<div className="search-config-item">
						<div onClick={() => this.handleOpenModal('sortModalShow')}>
							<span className="icon-Movie" />Sort
						</div>
					</div>
					<div className="search-config-item">
						<span className="icon-Movie" />Reset
					</div>
				</div>

				<div className="mobile-search-config">
					<div className="vertical-flex sf-menu " id="video-search-header-filtering-padding">
						<div className="search-config-item" onClick={() => this.handleOpenModal('tagsModalShow')}>
							<span className="icon-Movie mobile-icon" />
						</div>
						<div className="search-config-item" onClick={() => this.handleOpenModal('studioModalShow')}>
							<span className="icon-Movie mobile-icon" />
						</div>

						<div className="search-config-item" onClick={() => this.handleOpenModal('sortModalShow')}>
							<span className="icon-Movie mobile-icon" />
						</div>

						<div className="search-config-item">
							<span className="icon-Movie mobile-icon" />
						</div>
					</div>
				</div>

				<SearchTagModal
					modalShow={this.state.tagsModalShow}
					handleCloseModal={() => this.handleCloseModal('tagsModalShow')}
				/>
				<SearchStudioModal
					modalShow={this.state.studioModalShow}
					handleCloseModal={() => this.handleCloseModal('studioModalShow')}
				/>
				<SearchSortModal
					modalShow={this.state.sortModalShow}
					handleCloseModal={() => this.handleCloseModal('sortModalShow')}
				/>
			</div>
		);
	}
}
