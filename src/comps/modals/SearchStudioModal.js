import React from 'react';
import ReactDOM from 'react-dom';

export default class SearchStudioModal extends React.Component {
	constructor(props) {
		super();
		this.state = {
			Studios: [
				{ studio: 'Studio1', selected: false },
				{ studio: 'Studio2', selected: false },
				{ studio: 'Studio3', selected: false },
				{ studio: 'Studio4', selected: false }
			],
			selectedStudios: []
		};
		this.handleStudioClick = this.handleStudioClick.bind(this);
		this.resetOptions = this.resetOptions.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.applyOptions = this.applyOptions.bind(this);
	}

	handleStudioClick(Studio, key) {
		let Studios = this.state.Studios.slice();
		const StudioIsAlreadySelected = Studios[key].selected;
		let selectedStudios = this.state.selectedStudios.slice();
		if (!StudioIsAlreadySelected) {
			//adding Studio to selected Studios array
			selectedStudios.push(Studio);
		} else {
			//removing Studio from selected array
			const index = selectedStudios.indexOf(Studio);
			if (index > -1) {
				selectedStudios.splice(index, 1);
			}
		}
		//toggling bool
		Studios[key].selected = !Studios[key].selected;
		this.setState({ Studios, selectedStudios });
	}

	resetOptions() {
		const Studios = this.state.Studios.map((StudioObj) => Object({ studio: StudioObj.studio, selected: false }));
		this.setState({ Studios, selectedStudios: [] });
	}

	handleCloseModal() {
		this.resetOptions();
		this.props.handleCloseModal();
	}

	applyOptions() {
		//we call props method that handles this part
		//we send the selectedStudios array in the method
	}

	render() {
		//listing all the Studios hardcoded in state as divs
		//console.log(this.state.selectedStudios);
		const Studios = this.state.Studios;
		const listStudios = Studios.map((StudioObj, key) => (
			<div
				className="search-config-option"
				key={key}
				onClick={() => this.handleStudioClick(StudioObj.studio, key)}
			>
				{StudioObj.studio}
			</div>
		));

		return (
			<div className="modal search-config-modal" style={this.props.modalShow ? { display: 'block' } : null}>
				<div className="modal-content">
					<div className="modal-header">
						<span className="icon-Movie modal-close" onClick={() => this.handleCloseModal()} />
						<div className="modal-title">Studios</div>
						<div className="modal-button" onClick={() => this.resetOptions()}>
							Reset
						</div>
					</div>
					<div className="modal-body">
						<div className="modal-body-title">Studios</div>
						<div className="modal-body-description">Find works made by the selected studios below: </div>
						<div className="modal-body-options">{listStudios}</div>
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
