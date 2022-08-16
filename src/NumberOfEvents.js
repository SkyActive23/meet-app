import React, { Component } from 'react';

class NumberOfEvents extends Component {
	state = {
		numberOfEvents: 32,
	};

	handleInputChanged = (event) => {
		const value = event.target.value;
		if (!isNaN(value) && value >= 1) {
			return this.setState({ numberOfEvents: value });
		} else {
			console.log('Please enter a valid number.');
			return this.state.numberOfEvents;
		}
	};

	render() {
		return (
			<div>
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