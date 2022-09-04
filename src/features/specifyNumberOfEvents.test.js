import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";

import App from "../App";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {

	test('When user hasn\'t specified number of events', ({ given, when, then }) => {
		let AppWrapper;
		given('user is on the main page', async () => {
			AppWrapper = mount(<App />);
		});

		when('the user hasn’t specified number', () => {
			AppWrapper.update();
		});

		then('the user sees 32 events', () => {
			expect(AppWrapper.find('.event')).toHaveLength(2);
		});
	});

	test('User wants to change number of events', ({ given, when, then }) => {
		let AppWrapper;
		given('user sees 32 events', async () => {
			AppWrapper = await mount(<App />);
		});

		when('the user changes number of events to what they want', () => {
			AppWrapper.update();
			AppWrapper.find("#events-number").simulate("change", { target: { value: 1 } });

		});

		then('number of events will be displayed', () => {
			AppWrapper.update();
			expect(AppWrapper.find(".numberOfEvents")).toHaveLength(1);

		});
	});
});