import React from 'react';
import { shallow } from 'enzyme';
import  NumberOfEvents from '../NumberOfEvents.js';


describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />); 
    });

    test('render textbox', () => {
		expect(NumberOfEventsWrapper.find('#events-number')).toHaveLength(1);
	});


    test('display number 32 by default', () => {
        expect(NumberOfEventsWrapper.find('#events-number')).toHaveLength(1);
    });
});