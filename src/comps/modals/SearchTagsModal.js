import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

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
		this.applyOptions = this.applyOptions.bind(this);
	}

	//setting the selected tags remembered by the searchconfig comp
	//also setting the bools in tags based on the selected tags
	componentDidMount() {
		const selectedTags = this.props.selectedTags;
		const tags = this.state.tags.map((tagObj) => {
			if (selectedTags.includes(tagObj.tag)) return { tag: tagObj.tag, selected: true };
			return { tag: tagObj.tag, selected: false };
		});
		this.setState({ tags, selectedTags });
	}

	handleTagClick(tag, key) {
		let tags = this.state.tags.slice();
		let selectedTags = this.state.selectedTags.slice();
		const tagIsAlreadySelected = tags[key].selected;
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

	//closes the modal in the props method
	applyOptions() {
		this.props.applyChanges(this.state.selectedTags);
	}

	render() {
		//console.log(this.state.selectedTags);

		const tags = this.state.tags;
		const listTags = tags.map((tagObj, key) => (
			<div className="search-config-option" key={key} onClick={() => this.handleTagClick(tagObj.tag, key)}>
				{tagObj.tag}
			</div>
		));

		return (
			<Modal
				className="modal search-config-modal"
				show={this.props.show}
				onHide={() => this.props.handleCloseModal()}
				//animation={false}
			>
				<div className="modal-content">
					<div className="modal-header">
						<span className="icon-Movie modal-close" onClick={() => this.props.handleCloseModal()} />
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
						<div className="modal-button" onClick={() => this.props.handleCloseModal()}>
							Cancel
						</div>
						<div className="modal-button" onClick={() => this.applyOptions()}>
							Apply
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}
