import React, { Component } from "react";
import Card from 'react-bootstrap/Card'

class Event extends Component {
  state = {
		collapsed: true,
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
			<Card className="event">
				<h3 className="title">{event.summary}</h3>
				<p className="start-time">
					{event.start.dateTime} {event.start.timeZone}
				</p>
				<p className="location">{event.location}</p>
				<button className={`btn-details ${collapsed ? 'show' : 'hide'}-details`} onClick={this.handleClick}>
					{collapsed ? 'Show Details' : 'Hide Details'}
				</button>
				{!collapsed && (
					<div className="additional-details">
						<p className=".event-description">{event.description}</p>
					</div>
				)}
			</Card>
		);
  }
}
export default Event;