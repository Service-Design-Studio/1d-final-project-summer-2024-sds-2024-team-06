Feature: EchoesWithin
    As an adolescent with mixed or uncontrollable emotions
    I want to engage with creativity to express my emotions
    so that I may learn to identify, express and reflect on my physical sensations and emotions

    Background:
        Given I have logged in
        Then the webpage should be displayed

    Scenario: Visit EchoesWithin Page
        Given I am on the activities page
        When I click the EchoesWithin button
        Then I should be redirected to the EchoesWithin page
        And I will hear an audio prompt begin to play

    Scenario: Partake in EchoesWithin Drawing activity 
        Given I am on the EchoesWithin page
        When I draw on the canvas
        Then I should see my brushstroke applied onto the background image

    Scenario: Prompt User
        Given I am on the EchoesWithin page
        When I require guidance and click the next prompt arrow
        Then the next audio prompt will play 

    Scenario: User wishes to save drawing
        Given I have completed my Drawing
        When I click "Publish to journal"
        Then a pop-up will appear asking the user to caption their work
    
    Scenario: User saves drawing
        Given I have completed my Drawing
        And I filled in a caption
        When I click the "Publish" button
        Then a pop-up will appear saying Drawing saved
        And I will redirected to the journal entry page
        
    Scenario: Incomplete submission exit pop-up
        Given I have completed my Drawing
        When I click the exit cross button at the top of the screen
        Then a pop-up will appear ensuring the user wants to leave

    

    
