import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";


import App from "../App";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
	let AppWrapper;

	test('When user hasn’t clicked show details', ({ given, when, then }) => {
		given('user is on the main page', () => {
			AppWrapper = mount(<App />);
			AppWrapper.update();
		});

		when('the user sees events on the page', () => {
		});

		then('event details is collapsed on each event', () => {
			expect(AppWrapper.find('.event-details')).toHaveLength(0)
		});
	});

	test('User wants to see the event details', ({ given, when, then }) => {
		let AppWrapper;
		given('user hasn’t clicked show details', async () => {
			AppWrapper = await mount(<App />);
		});

		when('the user clicks show details', () => {
			AppWrapper.update();
			expect(AppWrapper.find('.btn-details')).toHaveLength(2);
			AppWrapper.find('.btn-details').at(0).simulate('click');
		});

		then('the user should see details of the event', () => {
			expect(AppWrapper.find('.event-details')).toHaveLength(1);
		});
	});

	test('User is done looking at event details', ({ given, when, then }) => {
		let AppWrapper;
		given('user sees details of the selected event', async () => {
			AppWrapper = await mount(<App />);
			AppWrapper.update();
			AppWrapper.find('.btn-details').at(0).simulate('click');
		});

		when('the user clicks hide details', () => {
			AppWrapper.find('.btn-details').at(0).simulate('click');
			expect(AppWrapper.find('.event-details')).toHaveLength(0);
		});

		then('the user should see the event details are gone', () => {
			expect(AppWrapper.find('.event-details')).toHaveLength(0);
		});
	});
});