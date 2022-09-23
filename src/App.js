import React, { Component } from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import Card from 'react-bootstrap/Card'

import './nprogress.css';
import './App.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 15,
    showWelcomeScreen: undefined
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

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render () {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />

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
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    )
  } 
}

export default App;
