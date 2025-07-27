## Approach

I started by mapping out the user journey and the points of integration. This helped clarify what endpoints would be immediately available to mock (location and the API itself) and which endpoints would require me to have more information before I could start mocking the service.

I then started with the BDD scenarios which is my prefered approach as it focusses on designing valuable tests rather than getting sinking time on developing working automated test code. Futhermore if the BDD scenarios cannot be automated in time to meet the deadline for the release the BDD scenarios can adequately serve as manual tests.

I spent some time thinking about all the weather conditions that might affect the ranking and how they might overlap however this felt like something that would take long time to get right so I opted for a scenario outline with tables that could be quickly interated on as more information became available.

I then developed the UI tests using Playwright first hardcoding everything into the spec itself as simple proof of concept approach then I created a page object model and asbtracted out actions and data that are reused across multiple tests.

I then wrote the API tests grouping them with comments so I could keep track of the areas I covered.

For all the automated tests I used loops and scenario outline to reduce the potential for duplication and provide and easy way to update values without have to touch the rest of the code.

I used pnpm as its currently the fastest package manager

I always add eslint and prettier to my codebase from the outset to maintain coding standards.

## AI assistance

- I used copilot to review my UI test and make recommendations on what I could abstract out to follow DRY.
- I also used Claude to list out the right weather conditions for surfing and skiing as I've not done either sport.
- I dont use agent mode as I believe it is too prone to creating unecessary levels of complexity.

## Omissions and trade-offs

- I did not create step definitions for the BDD scenarios as it was unclear if this was expected.
- The open-meteo endpoint documentation suggets that it takes latitude and longitude rather than cities or towns. Its unclear when or what is providing these as the autocomplete search field just returns towns and cities. If this was clarified additional tests may need to be written.
- If there was more time contract tests for the open-meto endpoint should be written as third party endpoint can change without warning.
