Feature: Daily Check-in
  As an adolescent with mixed or uncontrollable emotions
  I want to develop a habit of mindfulness and look back upon my emotional variance
  so that I may learn to reflect on my emotions and control them better, I have a simple and interactive way to reflect and visually articulate my emotions, the monthly emotion tracker gradually fills up

  Scenario: Logging in on new browser
    Given I am on a new browser
    When I visit the landing page
    Then I should be redirected to the log in page

  Scenario: User is logged in and visits landing page
    Given I have logged in
    When I visit the landing page
    Then the webpage should be displayed

  Scenario: User is logged in as guest and visits landing page
    Given I am logged in as guest
    When I visit the landing page
    Then the webpage should be displayed

  Scenario: Mood Selection on check-in Page
    Given I am logged in on the check-in page
    When I click on 'Excited' mood block
    Then I should see the mood chosen to be Excited

  Scenario: Correct number of flowers displayed
    Given I am logged into an account with flowers
    When I visit the check-in page
    Then I should see the correct number of flowers shown in the grids

  Scenario: Returning to check-in page again
    Given I have already submitted the mood for today
    When I return to the check-in page
    Then I should not see selection of moodblocks

  Scenario: Not logged in User tries to directly access check-in
    Given I am not logged in
    When I visit the check-in page
    Then I should be redirected to the log in page

  Scenario: User 1 attempts to access User 2 flowers
    Given there are two users with flowers in database
    When user 1 visit api endpoint for flowers
    Then he will only see his own flowers

