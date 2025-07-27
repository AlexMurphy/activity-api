export class SearchHelper {
  static async selectLocation(
    page: any,
    activityPage: any,
    location: string,
    testInfo?: any,
  ) {
    await activityPage.searchBox.fill(location);

    const platform = testInfo?.project.metadata?.platform;
    if (platform === "mobile" || platform === "tablet") {
      await activityPage.searchResultItem.first().tap();
    } else {
      await activityPage.searchResultItem.first().click();
    }
  }

  static async clearSearchBox(page: any, activityPage: any, length: number) {
    for (let i = 0; i < length; i++) {
      await activityPage.searchBox.press("Backspace");
    }
  }
}
