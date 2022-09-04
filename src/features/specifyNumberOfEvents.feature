Feature: Specify number of events

    Scenario: When user hasn't specified number of events
        Given user is on the main page
        When the user hasn’t specified number
        Then the user sees 32 events

    Scenario: User wants to change number of events
        Given user sees 32 events
        When the user changes number of events to what they want
        Then number of events will be displayed
