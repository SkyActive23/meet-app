import React, { Component } from "react";
import { mockData } from './mock-data';

class Event extends Component {
  state = {
		collapsed: true,
	};

	showSummary = () => {
		if (this.state.collapsed === false) {
			return mockData[0].description;
		}
	};

	handleClick = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

  render() {
    const { collapsed } = this.state;
    const { event } = this.props;
		return (
			<div className="event">
				<h3 className="title">{event.summary}</h3>
				<p className="start-time">
					{event.start.dateTime} {event.start.timeZone}
				</p>
				<p className="location">{event.location}</p>
				<button className={`btn-details ${collapsed ? 'show' : 'hide'}-details`} onClick={this.handleClick}>
					{collapsed ? 'Show Details' : 'Hide Details'}
				</button>
				{!collapsed &&
					<div className={`event-details ${this.state.collapsed ? 'hide' : 'show'}`}>{this.showSummary()}</div>}
			</div>
		);
  }
}
export default Event;