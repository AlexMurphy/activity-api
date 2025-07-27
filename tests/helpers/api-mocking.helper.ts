export class APIMockingHelper {
  static async mockLocationAPI(page: any, locations: { name: string }[]) {
    await page.route("**/api/locations**", async (route) => {
      await route.fulfill({
        json: locations,
      });
    });
  }

  static async mockWeatherAPI(
    page: any,
    location: string,
    forecast: any[],
    status = 200,
  ) {
    await page.route("**/api.open-meteo.com/**", async (route) => {
      await route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify({
          location,
          forecast,
        }),
      });
    });
  }

  static async mockWeatherAPIError(page: any, status = 404) {
    await page.route("**/api.open-meteo.com/**", async (route) => {
      await route.fulfill({
        status,
        contentType: "text/plain",
        body: "Not Found!",
      });
    });
  }
}
