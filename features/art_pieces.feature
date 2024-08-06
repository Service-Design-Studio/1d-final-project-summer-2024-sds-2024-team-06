Feature: Gallery Walk
  As an adolescent who wants to name my emotions
  I want to be guided through a process that allows me to notice my subconscious emotions
  So that I can practice emotional well-being and manage my mental state better

  Background:
    Given I have logged in
    Then the webpage should be displayed

  Scenario: Participant visits the Gallery Walk activity
    Given participant chosen to partake in the Gallery Walk
    When I navigate to the activities page
    And I click on "Let's meditate"
    Then I should see a flower loading screen
    And I should see a carousel of art pieces
  
  Scenario: Participant begins a Gallery Walk activity
    Given participant chosen to partake in the Gallery Walk
    When I navigate to the Gallery Walk
    And I choose a picture from the carousel
    Then a mp3 audio player and text box will be displayed alongside picture

  Scenario: During the activity, play voiceover to start
    Given I am in a Gallery Walk session
    When I click the play button
    Then audio will play

  Scenario: During the activity, the participant writes their journal
    Given I am listening to the voice-over
    When I want to express my emotions in writing
    Then I will type in the text box provided
    And the text box will show my input

  Scenario: The participant submits their journal
    Given I have finished writing my journal
    When I click on "Publish to journal"
    Then I should be redirected to my saved journal entry
