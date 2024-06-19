Feature: View art pieces
  As a visitor
  I want to view a list of art pieces
  So that I can see all available art pieces

  Scenario: Viewing the list of art pieces
    Given there are art pieces in the database
    When I visit the art pieces page
    Then I should see a list of art pieces
