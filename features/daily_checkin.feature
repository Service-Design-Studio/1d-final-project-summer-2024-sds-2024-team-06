Feature: Daily Check-in
  As an adolescent with mixed or uncontrollable emotions
  I want to develop a habit of mindfulness and look back upon my emotional variance
  so that I may learn to reflect on my emotions and control them better, I have a simple and interactive way to reflect and visually articulate my emotions, the monthly emotion tracker gradually fills up

  Background: 
    Given that I am a user who is logging in for the first time today

  Scenario: redirected to check-in page upon log in
    Given I am on the landing page
    When I log in
    Then I should be redirected to the check-in page

  Scenario: Mood Selection Availability on check-in Page
    When I am on the check-in page
    Then I should see a selection of moodblocks

  Scenario: Correct number of flowers displayed
    When I am on the check-in page
    Then I should see the correct number of flowers shown in the grids
    And the grid for today should be empty

  Scenario: Choosing a Moodblock
    Given I am on the check-in page
    When I click on the "angry" moodblock
    Then the "angry" moodblock should be selected

  Scenario: Submitting the Mood Selection
    Given I have selected the "angry" moodblock
    When I click on the submit button
    Then I should see an "angry" flower of the correct color added to today's grid

  Scenario: Redirecting to Activities Page
    Given I have submitted my mood selection
    When I am on the check-in page
    Then I will be redirected to the activities page

  Scenario: Returning to check-in page again
    Given I have already submitted the mood for today
    When I return to the check-in page
    Then I should not see selection of moodblocks
