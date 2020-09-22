import React from 'react';
import SearchTagModal from './modals/SearchTagsModal';
import SearchStudioModal from './modals/SearchStudioModal';
import { Dropdown } from 'semantic-ui-react';

export default class SearchConfig extends React.Component {
	constructor() {
		super();
		this.state = {
			tagsModalShow: false,
			studioModalShow: false,
			selectedTags: [],
			selectedSutios: [],
			selectedSortMethod: null
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.applyChanges = this.applyChanges.bind(this);
		this.changeSortMethod = this.changeSortMethod.bind(this);
		this.resetConfig = this.resetConfig.bind(this);
	}

	handleOpenModal(modalName) {
		this.setState({ [modalName]: true });
	}

	handleCloseModal(modalName) {
		this.setState({ [modalName]: false });
	}

	applyChanges(modalName, selectedOptions) {
		if (modalName === 'tagsModalShow') this.setState({ selectedTags: selectedOptions });
		if (modalName === 'studioModalShow') this.setState({ selectedSutios: selectedOptions });
		this.handleCloseModal(modalName);
	}

	changeSortMethod(selectedSortMethod) {
		this.setState({ selectedSortMethod });
	}

	resetConfig() {
		this.setState({
			selectedTags: [],
			selectedSutios: [],
			selectedSortMethod: null
		});
	}

	render() {
		//before anything, we need to make a call to props.applyConfig
		//the searchRoute would build the url using the config params
		//then set the result of the request sent to the server as state
		//which will then render the anime list with new content
		const sortMethods = [
			'Recent uploads',
			'Old uploads',
			'Highest Ratings',
			'Lowest ratings',
			'Newest',
			'Oldest',
			'Alphabetical A-Z',
			'Alphabetical Z-A'
		];
		const sortDropDownMenu = (
			<Dropdown
				icon=""
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					top: '0',
					left: '0'
				}}
			>
				<Dropdown.Menu>
					{sortMethods.map((entry, key) => (
						<Dropdown.Item
							key={key}
							text={entry}
							value={entry}
							icon={this.state.selectedSortMethod === entry ? 'circle thin' : ''}
							onClick={(e, data) => this.changeSortMethod(data.value)}
						/>
					))}
				</Dropdown.Menu>
			</Dropdown>
		);
		//console.log('in parent: ' + this.state.selectedTags);
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
						<span className="icon-Movie" />Sort
						{sortDropDownMenu}
					</div>
					<div className="search-config-item">
						<span className="icon-Movie" onClick={() => this.resetConfig()} />Reset
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

						<div className="search-config-item">
							<span className="icon-Movie mobile-icon" />
							{sortDropDownMenu}
						</div>

						<div className="search-config-item">
							<span className="icon-Movie mobile-icon" onClick={() => this.resetConfig()} />
						</div>
					</div>
				</div>
				{this.state.tagsModalShow ? (
					<SearchTagModal
						show={this.state.tagsModalShow}
						selectedTags={this.state.selectedTags}
						handleCloseModal={() => this.handleCloseModal('tagsModalShow')}
						applyChanges={(selectedTags) => this.applyChanges('tagsModalShow', selectedTags)}
					/>
				) : null}

				{this.state.studioModalShow ? (
					<SearchStudioModal
						show={this.state.studioModalShow}
						selectedStudios={this.state.selectedSutios}
						handleCloseModal={() => this.handleCloseModal('studioModalShow')}
						applyChanges={(selectedStudio) => this.applyChanges('studioModalShow', selectedStudio)}
					/>
				) : null}
			</div>
		);
	}
}
