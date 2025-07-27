# Manual Test Plan:

## Preconditions:

- Application is loaded and accessible
- Internet connection is stable
- Test data prepared (valid cities, invalid inputs, etc.)
- API endpoints are available and responding

## Test Environment:

- Browser: Chrome latest, Firefox latest, Safari latest
- Devices: Desktop, Mobile
- Test data: Predefined list of cities and edge case inputs

### Test Case: Partial Match

#### Action:

Enter "New"

#### Expected Result:

The following values are displayed: New York, New Orleans, Newcastle, Newport

### Test Case: Exact Match

#### Action:

Enter "Cape Town"

#### Expected Result:

The following value is displayed: Cape Town

### Test Case: Case sensitivity

#### Action:

Enter "CAPE TOWN"

#### Expected Result:

The following value is displayed: Cape Town

### Test Case: Select value

#### Action:

1. Enter "Tokyo"
2. Select the first result

#### Expected Result:

The the following sports are ranked by according to their appropriateness according to the weather for the next 7 days:

- Skiing
- Surfing
- Outdoor Sightseeing
- Indoor Sightseeing

### Test Case: Invalid input

#### Action:

Enter "Silent Hill"

#### Expected Result:

No suggestions are displayed

### Test Case: Empty input

#### Action:

Attempt to click where suggestions would be displayed

#### Expected Result:

Nothing as no suggestions are displayed

### Test Case: Enter Special characters

#### Action:

Enter "Haʻikū-Pauwela"

#### Expected Result:

"Haʻikū-Pauwela" is displayed as a suggestion

### Test Case: Select value with special characters

#### Action:

1. Enter "Haʻikū-Pauwela"
2. Select the first result

#### Expected Result:

The the following sports are ranked by according to their appropriateness according to the weather for the next 7 days:

- Skiing
- Surfing
- Outdoor Sightseeing
- Indoor Sightseeing

## Edge Cases:

### Test Case: Long input

#### Action:

Enter a string longer than 100 characters

#### Expected Result:

Input is truncated

### Test Case: Slow connection - Autocomplete

#### Action:

1. Use browser development tools to simulate a slow 3G connection
2. Enter "Alghero"

#### Expected Result:

A suggestion is displayed within an acceptable number of seconds

### Test Case: Slow connection - Submit

#### Action:

1. Use browser development tools to simulate a slow 3G connection
2. Enter "Alghero"
3. Select the location returned

#### Expected Result:

The the following sports are displayed within the agreed number of seconds and ranked by according to their appropriateness according to the weather for the next 7 days:

- Skiing
- Surfing
- Outdoor Sightseeing
- Indoor Sightseeing

### Test Case: No network - Autocomplete

#### Action:

1. Disconnent internet connect
2. Enter: "Mumbai"

#### Expected Result:

No results are displayed

### Test Case: No network - Submit

#### Action:

1. Enter: "Mumbai"
2. Disconnent internet connect
3. Select first result

#### Expected Result:

The weather report is not returned

## Accessibility Tests

### Test Case: Keyboard navigation - Move focus to searchfield

#### Action:

Use the keyboard to tab to the search field

#### Expected Result:

Search field has focus

### Test Case: Keyboard navigation - Select a autocomplete suggestion

#### Action:

Enter "New"
Use the keyboard to tab to the autocomplete suggestions

#### Expected Result:

User can move to the results and switch focus between them and submit a result

### Test Case: Screen Reader

#### Action:

1. Using a screen reader navigate to the auto complete field

#### Expected Result:

Screen reader annouces the purpose of the field

### Test Case: Screen Reader - Autocomplete

#### Action:

1. Using a screen reader navigate to the auto complete field
2. Enter "New"

#### Expected Result:

Screen reader annouces the number of results

### Test Case: Screen Reader - Autocomplete Results

#### Action:

1. Using a screen reader navigate to the auto complete field
2. Enter "New"
3. Use the keyboard to move focus through the autocomplete results

#### Expected Result:

Screen reader annouces each location when focus moves

### Test Case: Screen Reader - Autocomplete Results

#### Action:

1. Using a screen reader navigate to the auto complete field
2. Enter "New"
3. Use the keyboard to move focus through the autocomplete results
4. Select a location

#### Expected Result:

Screen reader reads out the ranked sports for the next 7 days in an understandable way

### Test Case: Readability

#### Action:

Using the Web Accessibility Evaluation Tool (WAVE) on all elements of the user flow

#### Expected Result:

The elements meet WCAG AA standards
