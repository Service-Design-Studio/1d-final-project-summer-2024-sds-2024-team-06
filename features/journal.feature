Feature: Journal
    As an adolescent with mixed or uncontrollable emotions
    I want to externalise my emotions and have a way to reflect upon my mental state
    so that I may learn to reflect on my emotions and control them better

    Background:
        Given I have logged in
        Then the webpage should be displayed

    Scenario: Visit Journal Page
        Given I am on the activities page
        When I click the navbar journal button
        Then I should be redirected to journal splashscreen

    Scenario: Bypass journal splashscreen
        Given I am on journal splashscreen
        When I click anywhere 
        Then I should be redirected to journal entries history

    Scenario: Create new journal entry
        Given I am on journal entries history
        When I click the new entry button
        Then button expands into menu with two items
    
    Scenario: View pinned goal-setting journal entry
        Given I am on journal entries history and user has completed a goal-setting journal
        When I click on the first goal entry
        Then I will be redirected to my most recent goal-setting journal

    Scenario: Create open-ended journal entry
        Given I opened create journal menu
        When I click on open ended journal item
        Then I will be redirected to a open-ended journal page

    Scenario: Create goal-setting journal entry
        Given I opened create journal menu
        When I click on goal-setting journal item
        Then I will be redirected to a goal-setting journal page

    Scenario: Writing open-ended journal entry
        Given I am on open-ended journal page
        When I click on "Guide Me" button
        Then I should see a prompt generated

    @journal-submission
    Scenario: Submit open-ended journal entry
        Given I have completed writing my open-ended journal entry
        When I click submit
        Then I will be redirected to open submission page

    @journal-submission
    Scenario: Submit goal-setting journal entry
        Given I have completed writing my goal-setting journal entry
        When I click submit
        Then I will be redirected to goal submission page
    
    Scenario: View past goal-setting journal entry
        Given I am on journal entries history
        When I click on a goal-setting journal entry item
        Then I will be redirected to the goal-setting journal past entry page
        And I will see three template fields

    Scenario: View past open-ended journal entry
        Given I am on journal entries history
        When I click on a open-ended journal entry item
        Then I will be redirected to the open-ended journal past entry page
        And I will see my journal entry and final tip generated

    Scenario: View past gallery walk journal entry
        Given I am on journal entries history
        When I click on a gallery walk journal entry item
        Then I will be redirected to the gallery walk journal past entry page
        And I will see my journal entry, title and the corresponding image

    Scenario: View past echoes within journal entry
        Given I am on journal entries history
        When I click on a echoes within journal entry item
        Then I will be redirected to the echoes within journal past entry page
        And I will see my journal entry and my sketch

    Scenario: Attempt to leave before open journal submission
        Given I have completed writing my open-ended journal entry
        When I click on the close button
        Then I will see a pop-up cautioning me that I will lose my progress

    Scenario: Attempt to leave before goal journal submission
        Given I have completed writing my goal-setting journal entry
        When I click on the close button
        Then I will see a pop-up cautioning me that I will lose my progress


