Feature: Daily login mood tracker

As an: adolescent with mixed or uncontrollable emotions
I want: to develop a habit of mindfulness and look back upon my emotional variance
so that: I may learn to reflect on my emotions and control them better, I have a simple and interactive way to reflect and visually articulate my emotions, the monthly emotion tracker gradually fills up


Scenario 1 : redirected to daily check-in page upon log in

Given I am on the landing page
When I want to log in as bob 
Then I should be redirected to the mood selection page

Scenario 2 : Mood Selection Availability on Daily Check-In Page

When I am on mood selection page
Then I should see a selection of moodblocks

Scenario 3 : Choosing a moodblock
Given I am on the mood selection page
When I click on the "angry" moodblock
Then I will be redirected to the flower field page
And I should see a "angry" flower of the correct color
#And flower should be in today's grid
#----------------







#------

Given I am logged in 
Given not done check-in
When I visit the homepage


Then redirect to daily check-in page
And I should see a selection of ‘mood blocks’



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