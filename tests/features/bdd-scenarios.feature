Feature: Activity Ranking API – City-Based Weather Forecast Integration with Search Suggestions

    As a user, I want to enter a city or town name and receive a ranked list of activities (Skiing, Surfing, Outdoor Sightseeing, Indoor Sightseeing) for the next 7 days, 
    based on weather conditions. As I type in the search box, I should also see autocomplete suggestions for matching cities or towns to help me complete my query faster.

    @pageLoaded
    Scenario: Page is loaded
        Given I am on the Activity Ranking Weather Forecast page
        Then I should see the search box

    @searchFunctionality @autocomplete @partialMatch
    Scenario: Partial match for a location
        Given the location database contains the following <Locations>
        And I am on the Activity Ranking Weather Forecast page
        When I enter "New" in the search box
        Then I should see the following <Locations> in the search results

        Example: Locations
                | Location    |
                | New York    |
                | New Orleans |
                | Newcastle   |
                | Newport     |
                | Newmarket   |
                | New Glasgow |

    @searchFunctionality @autocomplete @partialMatch @exactMatch
    Scenario: Partial match to an exact match for a location
        Given the location database contains the following <Locations>
        And I am on the Activity Ranking Weather Forecast page
        And I have entered "New" in the search box
        And I can see the following <Locations> in the search results
        When I enter "New York" in the search box
        Then I should only see "New York" in the search results

        Example: Locations
                | Location    |
                | New York    |
                | New Orleans |
                | Newcastle   |
                | Newport     |
                | Newmarket   |
                | New Glasgow |

    @searchFunctionality @autocomplete @specialCharacters
    Scenario Outline: Autocomplete with special characters
        Given the location database contains:
            | Location     |
            | Saint-Tropez |
            | L"Aquila     |
            | São Paulo    |
        And I am on the Activity Ranking Weather Forecast page
        When I type <Location> in the search box
        And I can see see the <Location> in the search results

    @edgeCases @searchFunctionality @autocomplete @invalidInput
    Scenario Outline: Searching for location that is not a town or city
        Given the location database only has towns and cities
        And I am on the Activity Ranking Weather Forecast page
        When I enter <Location> in the search box
        Then I should see no results

        Examples:
            | Location        |
            | Mount Everest   |
            | SW1A 1AA        |
            | Buckinghamshire |

    Scenario: Exact match to partial match
        Given the location database contains the following <Locations>
        And I am on the Activity Ranking Weather Forecast page
        And I have entered "New York" in the search box
        And I can see "New York" in the search results
        When I delete "York" in the search box
        Then I should see the following <Locations> in the search results

        Example: Locations
                | Location    |
                | New York    |
                | New Orleans |
                | Newcastle   |
                | Newport     |
                | Newmarket   |
                | New Glasgow |

    Scenario: Clear search box
        Given I am on the Activity Ranking Weather Forecast page
        And I have entered "New York" in the search box
        And I can see "New York" in the search results
        When I clear the search box
        Then I should see no results

    Scenario: Valid input, Weather API down
        Given I am on the Activity Ranking Weather Forecast page
        And the weather API is down
        When I submit "London" in the search box
        Then I should see an error message indicating that the weather API is unavailable

    Scenario: Valid input, Activity Ranking API down
        Given I am on the Activity Ranking Weather Forecast page
        And the activity ranking API is down
        When I submit "London" in the search box
        Then I should see an error message indicating that the activity ranking API is unavailable

    # This scenario should cover desktop clicks and mobile taps
    # This will be handled by a conditon in the step definition
    Scenario: User clicks on a location
        Given the a location is displayed in the search results
        When I select a location
        Then the results should be displayed

    Scenario: 7 days of results are displayed
        Given I have selected a location
        Then I should see the activity ranking for the next 7 days

    Scenario Outline: Display activities ranked by weather conditions
        Given the weather conditions for "London" for day <day_number> are:
            | day_number | temperature | precipitation | wind_speed | cloud_cover   | visibility |
            | 1          | Cold        | Snow          | Light      | Overcast      | Good       |
            | 2          | Warm        | None          | Light      | Clear         | Good       |
            | 3          | Mild        | Heavy Rain    | Moderate   | Overcast      | Poor       |
            | 4          | Cool        | Light Rain    | Light      | Mostly Cloudy | Fair       |
            | 5          | Mild        | None          | Strong     | Partly Cloudy | Good       |
            | 6          | Cold        | Thunderstorm  | Strong     | Overcast      | Poor       |
            | 7          | Warm        | None          | Light      | Partly Cloudy | Good       |
        When I have select "London" as the location
        Then I should see a list of 4 activities ranked for that day
        And the activity ranking should be appropriate for the combined weather conditions
        And "Skiing" should be ranked <skiing_rank>
        And "Surfing" should be ranked <surfing_rank>
        And "Outdoor Sightseeing" should be ranked <outdoor_rank>
        And "Indoor Sightseeing" should be ranked <indoor_rank>       

        Examples:
            | skiing_rank | surfing_rank | outdoor_rank | indoor_rank |
            | 1           | 4            | 3            | 2           |
            | 4           | 1            | 2            | 3           |
            | 3           | 4            | 4            | 1           |
            | 3           | 3            | 3            | 1           |
            | 2           | 1            | 3            | 4           |
            | 4           | 4            | 4            | 1           |
            | 4           | 2            | 1            | 3           |