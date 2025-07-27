import { Page, Locator } from "@playwright/test";

export class ActivityRankingPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchResults: Locator;
  readonly searchResultItem: Locator;
  readonly clearSearchButton: Locator;
  readonly noResultsMessage: Locator;
  readonly errorMessage: Locator;
  readonly forecastResults: Locator;
  readonly skiing: Locator;
  readonly surfing: Locator;
  readonly outdoor: Locator;
  readonly indoor: Locator;
  readonly skiingRank: Locator;
  readonly surfingRank: Locator;
  readonly outdoorRank: Locator;
  readonly indoorRank: Locator;
  readonly activities: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('[data-testid="search-box"]');
    this.searchResults = page.locator('[data-testid="search-results"]');
    this.searchResultItem = page.locator('[data-testid="search-result-item"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.forecastResults = page.locator('[data-testid="forecast-results"]');
    this.skiing = page.locator('[data-testid="skiing"]');
    this.surfing = page.locator('[data-testid="surfing"]');
    this.outdoor = page.locator('[data-testid="outdoor-sightseeing"]');
    this.indoor = page.locator('[data-testid="indoor-sightseeing"]');
    this.skiingRank = page.locator(`[data-testid="skiing-rank"]`);
    this.surfingRank = page.locator(`[data-testid="surfing-rank"]`);
    this.outdoorRank = page.locator(`[data-testid="outdoor-rank"]`);
    this.indoorRank = page.locator(`[data-testid="indoor-rank"]`);
    this.activities = page.locator(
      '[data-testid="activity-list"] .activity-item',
    );
  }
}
