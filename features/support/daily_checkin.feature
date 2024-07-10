Feature: Daily login mood tracker

As an: adolescent with mixed or uncontrollable emotions
I want: to develop a habit of mindfulness and look back upon my emotional variance
so that: I may learn to reflect on my emotions and control them better, I have a simple and interactive way to reflect and visually articulate my emotions, the monthly emotion tracker gradually fills up


Background: Given that I am a user who has been using the app and I am logging in for the first time today

Scenario 1 : redirected to check-in page upon log in

Given I am on the landing page
When I log in
Then I should be redirected to the check-in page


Scenario 2a : Mood Selection Availability on check-in Page

When I am on the check-in page
Then I should see a selection of moodblocks


Scenario 2b : Correct number of flowers displayed
When I am on the check-in page
Then I should see the correct number of flowers shown in the grids
And the slot for today should be empty


Scenario 3a : Choosing a Moodblock
Given I am on the check-in page
When I click on the "angry" moodblock
Then The "angry" moodblock should be selected

Scenario 3b : Submitting the Mood Selection
Given I have selected the "angry" moodblock
When I click on the submit button
Then I should see a "angry" flower of the correct color added to today's grid

Scenario 3c : Redirecting to Activities Page
Given I have submitted my mood selection
Then I will be redirected to the activities page

Scenario 4 : Returning to check-in page again
Given I have already submited the mood for today
when I return to the check-in page
Then I should not see selection of moodblocks

