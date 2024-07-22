Feature: Journal
    As an adolescent with mixed or uncontrollable emotions
    I want to externalise my emotions and have a way to reflect upon my mental state
    so that I may learn to reflect on my emotions and control them better

    Background:
        Given I have logged in
        Then the webpage should be displayed

    Scenario: Visit Journal Page
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
        When I click on the first entry
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
        Then a sidebar should open with a prompt

    Scenario: Create goal-setting journal entry
        Given I am on goal-setting journal page
        When I click on "Generate Tip" button
        Then a sidebar should open with a tip

    Scenario: Submit open-ended journal entry
        Given I have completed writing my open-ended journal entry
        When I click submit
        Then a pop-up self-care tip will be displayed
        And I will be redirected to journal entries history

    Scenario: Submit goal-setting journal entry
        Given I have completed writing my goal-setting journal entry
        When I click submit
        Then I will be redirected to journal entries history
        And it should be the first entry

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
