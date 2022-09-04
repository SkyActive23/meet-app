Feature: Show/Hide details of an event

    Scenario: When user hasn’t clicked show details
        Given user is on the main page
        When the user sees events on the page
        Then event details is collapsed on each event

    Scenario: User wants to see the event details
        Given user hasn’t clicked show details
        When the user clicks show details
        Then the user should see details of the event

    Scenario: User is done looking at event details
        Given user sees details of the selected event
        When the user clicks hide details
        Then the user should see the event details are gone

