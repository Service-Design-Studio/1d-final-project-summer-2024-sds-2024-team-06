Feature: Daily login mood tracker

As an: adolescent with mixed or uncontrollable emotions
I want: to develop a habit of mindfulness and look back upon my emotional variance
so that: I may learn to reflect on my emotions and control them better, I have a simple and interactive way to reflect and visually articulate my emotions, the monthly emotion tracker gradually fills up


#Background



Scenario: Option to select mood
Given I am logged in 
Given not done check-in
When I visit the homepage
Then redirect to daily check-in page
And I should see a selection of ‘mood blocks’

Scenario: Choosing a mood blocks
Given I am on the daily check-in page
When I click on the "sad" mood block
#Then data should exist in daily_checkin
Then I should see a new flower with 'sad color'

Scenario: Correct number of total flowers
Given I have done check in before
When I am on the homepage
Then I should see exactly 3 happy flowers

Scenario: Redirecting to activities
Given I am on the homepage
When I click on the museum
Then I should visit activities page

###########################################################

Scenario: Not logged in
Given I am not logged in
When I visit homepage
Then I get directed to the activities page

Scenario: Revisiting the homepage
Given I have already done check in
When I visit the homepage
Then I should not see selection of ‘mood blocks’