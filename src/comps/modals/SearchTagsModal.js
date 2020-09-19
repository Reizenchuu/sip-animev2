import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchTagModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			tags: [
				{ tag: 'tag1', selected: false },
				{ tag: 'tag2', selected: false },
				{ tag: 'tag3', selected: false },
				{ tag: 'tag4', selected: false }
			],
			selectedTags: []
		};
		this.handleTagClick = this.handleTagClick.bind(this);
		this.resetOptions = this.resetOptions.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.applyOptions = this.applyOptions.bind(this);
		//to handle clicks outside modal
		this.wrapperRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
			this.handleCloseModal();
		}
	}

	handleTagClick(tag, key) {
		let tags = this.state.tags.slice();
		const tagIsAlreadySelected = tags[key].selected;
		let selectedTags = this.state.selectedTags.slice();
		if (!tagIsAlreadySelected) {
			//adding tag to selected tags array
			selectedTags.push(tag);
		} else {
			//removing tag from selected array
			const index = selectedTags.indexOf(tag);
			if (index > -1) {
				selectedTags.splice(index, 1);
			}
		}
		//toggling bool
		tags[key].selected = !tags[key].selected;
		this.setState({ tags, selectedTags });
	}

	resetOptions() {
		const tags = this.state.tags.map((tagObj) => Object({ tag: tagObj.tag, selected: false }));
		this.setState({ tags, selectedTags: [] });
	}

	handleCloseModal() {
		this.resetOptions();
		this.props.handleCloseModal();
	}

	applyOptions() {
		//we call props method that handles this part
		//we send the selectedTags array in the method
	}

	render() {
		//listing all the tags hardcoded in state as divs
		const tags = this.state.tags;
		const listTags = tags.map((tagObj, key) => (
			<div className="search-config-option" key={key} onClick={() => this.handleTagClick(tagObj.tag, key)}>
				{tagObj.tag}
			</div>
		));

		return (
			<div
				className="modal search-config-modal"
				style={this.props.modalShow ? { display: 'block' } : null}
				ref={this.wrapperRef}
			>
				<div className="modal-content">
					<div className="modal-header">
						<span className="icon-Movie modal-close" onClick={() => this.handleCloseModal()} />
						<div className="modal-title">Tags</div>
						<div className="modal-button" onClick={() => this.resetOptions()}>
							Reset
						</div>
					</div>
					<div className="modal-body">
						<div className="modal-body-title">Include Tags</div>
						<div className="modal-body-description">Find a series that has all selected tags below</div>
						<div className="modal-body-options">{listTags}</div>
					</div>
					<div className="modal-footer">
						<div className="modal-button" onClick={() => this.handleCloseModal()}>
							Cancel
						</div>
						<div className="modal-button">Apply</div>
					</div>
				</div>
			</div>
		);
	}
}
