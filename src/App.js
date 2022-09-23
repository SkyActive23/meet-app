import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from './api';
import Card from 'react-bootstrap/Card'

import './nprogress.css';
import './App.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 15,

  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
          numberOfEvents: eventCount,
        });
      }
    });
  };

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents,
    });

    this.updateEvents(this.state.locations, numberOfEvents);
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render () {
    return (
      <div className="App">
        <h1>Meet App</h1>
        <NumberOfEvents events={this.state.numberOfEvents}
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <Card>
          <EventList events={this.state.events} />
        </Card>
      </div>
    )
  } 
}

export default App;
