import { test, expect } from "@playwright/test";
import { ActivityRankingPage } from "./pages/activity-ranking.page";
import {
  TEST_LOCATIONS,
  WEATHER_DATA,
  EXPECTED_RANKINGS,
} from "./data/test-data";
import { APIMockingHelper } from "./helpers/api-mocking.helper";
import { SearchHelper } from "./helpers/search.helper";

test.describe("Activity Ranking Weather Forecast", () => {
  let activityPage: ActivityRankingPage;

  test.beforeEach(async ({ page }) => {
    activityPage = new ActivityRankingPage(page);
    await page.goto("/activity-ranking-weather-forecast");
  });

  test("should display the search box", async () => {
    const isLoaded = activityPage.searchBox;
    await expect(isLoaded).toBeVisible();
  });

  test("should display a list of suggestions for a partial match", async ({
    page,
  }) => {
    // Given the location database contains locations starting with "New"
    // Mock the API response
    await APIMockingHelper.mockLocationAPI(page, TEST_LOCATIONS.NEW_CITIES);

    // When I enter "New" in the search box
    await activityPage.searchBox.fill("New");

    // Then I should see the following locations in the search results
    await expect(activityPage.searchResults).toContainText("New York");
    await expect(activityPage.searchResults).toContainText("New Orleans");
    await expect(activityPage.searchResults).toContainText("Newcastle");
    await expect(activityPage.searchResults).toContainText("Newport");
    await expect(activityPage.searchResults).toContainText("Newmarket");
    await expect(activityPage.searchResults).toContainText("New Glasgow");
  });

  test("should display a list of suggestions for an exact match after the partial match is displayed", async ({
    page,
  }) => {
    // Given the location database contains locations starting with "New"
    // Mock the API response
    await APIMockingHelper.mockLocationAPI(page, TEST_LOCATIONS.NEW_CITIES);

    // When I enter "New" in the search box
    await activityPage.searchBox.fill("New");

    // Then I should see the following locations in the search results
    await expect(activityPage.searchResults).toContainText("New York");
    await expect(activityPage.searchResults).toContainText("New Orleans");
    await expect(activityPage.searchResults).toContainText("Newcastle");
    await expect(activityPage.searchResults).toContainText("Newport");
    await expect(activityPage.searchResults).toContainText("Newmarket");
    await expect(activityPage.searchResults).toContainText("New Glasgow");

    // When I enter " York" in the search box
    await activityPage.searchBox.pressSequentially(" York");

    // Then I should only see New York in the search results
    await expect(activityPage.searchResults).toContainText("New York");

    await expect(activityPage.searchResults).not.toContainText("New Orleans");
    await expect(activityPage.searchResults).not.toContainText("Newcastle");
    await expect(activityPage.searchResults).not.toContainText("Newport");
    await expect(activityPage.searchResults).not.toContainText("Newmarket");
    await expect(activityPage.searchResults).not.toContainText("New Glasgow");
  });

  test("should display a list of suggestions for a partial match after the exact location name is reduced to a partial string", async ({
    page,
  }) => {
    // Given the location database contains locations starting with "New"
    // Mock the API response
    await APIMockingHelper.mockLocationAPI(page, TEST_LOCATIONS.NEW_CITIES);

    // When I enter "New" in the search box
    await activityPage.searchBox.fill("New York");

    // Then I should only see New York in the search results
    await expect(activityPage.searchResults).toContainText("New York");

    await expect(activityPage.searchResults).not.toContainText("New Orleans");
    await expect(activityPage.searchResults).not.toContainText("Newcastle");
    await expect(activityPage.searchResults).not.toContainText("Newport");
    await expect(activityPage.searchResults).not.toContainText("Newmarket");
    await expect(activityPage.searchResults).not.toContainText("New Glasgow");

    // When I enter " York" in the search box
    SearchHelper.clearSearchBox(page, activityPage, 6);

    // Then I should see the following locations in the search results
    await expect(activityPage.searchResults).toContainText("New York");
    await expect(activityPage.searchResults).toContainText("New Orleans");
    await expect(activityPage.searchResults).toContainText("Newcastle");
    await expect(activityPage.searchResults).toContainText("Newport");
    await expect(activityPage.searchResults).toContainText("Newmarket");
    await expect(activityPage.searchResults).toContainText("New Glasgow");
  });

  TEST_LOCATIONS.SPECIAL_CHARACTER_LOCATIONS.forEach((location) => {
    test(`should display a list of suggestions for locations with special characters: ${location.name}`, async ({
      page,
    }) => {
      // Given the location database contains locations that include special characters
      // Mock the API response
      await page.route("**/api/locations**", async (route) => {
        await route.fulfill({
          json: [location],
        });
      });

      // When I search for the location
      await activityPage.searchBox.fill(location.name);

      // Then I should see the location in the search results
      await expect(activityPage.searchResults).toContainText(location.name);
    });
  });

  TEST_LOCATIONS.INVALID_LOCATIONS.forEach((location) => {
    test(`should not display results for location that isn't a town or city: ${location}`, async () => {
      await activityPage.searchBox.fill(location);

      // Then I should see the location in the search results
      await expect(activityPage.searchResults).toBeHidden();
    });
  });

  test("should not display results when the search box is cleared", async ({
    page,
  }) => {
    // Given the location database contains locations starting with "New"
    // Mock the API response
    await page.route("**/api/locations**", async (route) => {
      await route.fulfill({
        json: TEST_LOCATIONS.SINGLE_LOCATION,
      });
    });

    // When I enter "New" in the search box
    await activityPage.searchBox.fill("New York");

    // Then I should only see New York in the search results
    await expect(activityPage.searchResults).toContainText("New York");

    SearchHelper.clearSearchBox(page, activityPage, 8);

    // Then I should see any search results
    await expect(activityPage.searchResults).toBeHidden();
  });

  test("should display results when a valid location is selected", async ({
    page,
  }, testInfo) => {
    // Given the location database contains locations starting with "New"
    // Mock the API response
    await page.route("**/api/locations**", async (route) => {
      await route.fulfill({
        json: TEST_LOCATIONS.SINGLE_LOCATION,
      });
    });

    // When I enter "New" in the search box
    await SearchHelper.selectLocation(page, activityPage, "New York", testInfo);

    await expect(activityPage.searchResults).toBeVisible();
  });

  test("should display an error message when a location is submitted and the weather API is down", async ({
    page,
  }, testInfo) => {
    // Given the location database contains locations starting with "New"
    // Mock the API response
    await page.route("**/api/locations**", async (route) => {
      await route.fulfill({
        json: TEST_LOCATIONS.SINGLE_LOCATION,
      });
    });

    await page.route("**/api.open-meteo.com/**", async (route) => {
      await route.fulfill({
        status: 404,
        contentType: "text/plain",
        body: "Not Found!",
      });
    });

    // When I enter "New" in the search box
    await SearchHelper.selectLocation(page, activityPage, "New York", testInfo);

    // Then I should see an error message
    await expect(activityPage.errorMessage).toBeVisible();
  });

  WEATHER_DATA.forEach((weather, index) => {
    const expected = EXPECTED_RANKINGS[index];

    test(`should display activities ranked correctly for day ${weather.day_number} - ${weather.temperature}, ${weather.precipitation}`, async ({
      page,
    }, testInfo) => {
      await page.route("**/some-end-point/**", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            location: "New York",
            forecast: WEATHER_DATA,
          }),
        });
      });

      await page.route("**/api/locations**", async (route) => {
        await route.fulfill({
          json: TEST_LOCATIONS.SINGLE_LOCATION,
        });
      });

      // When I enter "New" in the search box
      await SearchHelper.selectLocation(
        page,
        activityPage,
        "New York",
        testInfo,
      );

      // Verify weather conditions are displayed
      // There is not requirement that specifies that the weather data is displayed
      // await expect(page.locator(`[data-testid="temperature-day-${weather.day_number}"]`)).toContainText(weather.temperature);
      // await expect(page.locator(`[data-testid="precipitation-day-${weather.day_number}"]`)).toContainText(weather.precipitation);
      // await expect(page.locator(`[data-testid="wind-speed-day-${weather.day_number}"]`)).toContainText(weather.wind_speed);
      // await expect(page.locator(`[data-testid="cloud-cover-day-${weather.day_number}"]`)).toContainText(weather.cloud_cover);
      // await expect(page.locator(`[data-testid="visibility-day-${weather.day_number}"]`)).toContainText(weather.visibility);

      // Verify 4 activities are displayed
      await expect(activityPage.activities).toHaveCount(4);

      // Verify specific activity rankings
      await expect(activityPage.skiingRank).toContainText(
        expected.skiing_rank.toString(),
      );
      await expect(activityPage.surfingRank).toContainText(
        expected.surfing_rank.toString(),
      );
      await expect(activityPage.outdoorRank).toContainText(
        expected.outdoor_rank.toString(),
      );
      await expect(activityPage.indoorRank).toContainText(
        expected.indoor_rank.toString(),
      );

      // Verify activities are properly ranked (1 = best, 4 = worst)
      await expect(activityPage.skiing).toHaveAttribute(
        "data-rank",
        expected.skiing_rank.toString(),
      );
      await expect(activityPage.surfing).toHaveAttribute(
        "data-rank",
        expected.surfing_rank.toString(),
      );
      await expect(activityPage.outdoor).toHaveAttribute(
        "data-rank",
        expected.outdoor_rank.toString(),
      );
      await expect(activityPage.indoor).toHaveAttribute(
        "data-rank",
        expected.indoor_rank.toString(),
      );
    });
  });
});
