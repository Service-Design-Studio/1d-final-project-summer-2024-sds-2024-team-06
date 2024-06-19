Feature: Gallery Walk
  As an adolescent who wants to name my emotions
  I want to be guided through a process that allows me to notice my subconscious emotions
  So that I can practice emotional well-being and manage my mental state better

  Scenario: Participant begins Gallery Walk activity
    Given participant chosen to partake in the Gallery Walk
    When I choose a picture from the carousel
    Then the other pictures should disappear, a mp3 audio player and text box will be displayed

  Scenario: During the activity
    Given I am listening to the voice-over
    When I want to express my emotions in writing
    Then text will be shown in the text box as accordance to user input

  Scenario: User has completed the Gallery Walk activity
    Given User is done with the gallery walk
    When they click the end activity button
    Then the journal entry is automatically saved to their journal tab, browser redirect to journal

  Scenario: Viewing the list of art gallery
    Given there are art pieces in the database
    When I visit the art pieces page
    Then I should see a list of art pieces
