import React, { Component } from 'react';
import { ErrorAlert } from './Alert'; 

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: 32,
		infoText: ''
	};

	handleInputChanged = (event) => {
		const value = event.target.value;
		if (value <= 0 || value > 32 ) {
			this.setState({
				numberOfEvents:'',
				infoText: 'Please pick a number 1-32'
			})
		} else {
			this.setState({
				numberOfEvents: value,
				infoText: ''
			})
		}
		this.props.updateNumberOfEvents(value);
	}

	render() {
		return (
			<div className='numberOfEvents'>
				<ErrorAlert text = {this.state.infoText}/>
				<label for="events-number">Number of Events</label>
				<input
					type="text"
					id="events-number"
					value={this.state.numberOfEvents}
					onChange={this.handleInputChanged}
				/>
			</div>
		);
	}
}
export default NumberOfEvents;