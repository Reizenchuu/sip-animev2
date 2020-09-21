import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

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
		this.applyOptions = this.applyOptions.bind(this);
	}

	componentDidMount() {
		const selectedStudios = this.props.selectedStudios;
		const Studios = this.state.Studios.map((stdObj) => {
			if (selectedStudios.includes(stdObj.studio)) return { studio: stdObj.studio, selected: true };
			return { studio: stdObj.studio, selected: false };
		});
		this.setState({ Studios, selectedStudios });
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

	applyOptions() {
		//we call props method that handles this part
		//we send the selectedStudios array in the method
		this.props.applyChanges(this.state.selectedStudios);
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
				ref={this.wrapperRef}
			>
				{StudioObj.studio}
			</div>
		));

		return (
			<Modal
				className="modal search-config-modal"
				show={this.props.show}
				onHide={() => this.props.handleCloseModal()}
			>
				<div className="modal-content">
					<div className="modal-header">
						<span className="icon-Movie modal-close" onClick={() => this.props.handleCloseModal()} />
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
