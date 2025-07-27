import axios, { AxiosResponse } from "axios";
import { expect } from "chai";
import { describe, it } from "node:test";

interface Activity {
    name: string;
    rank: number;
    reasoning: string;
}

interface WeatherDay {
    date: string;
    activities: Activity[];
}

type WeatherResponse = WeatherDay[];

describe("Open Meteo API Tests", async () => {
    const BASE_URL = "http://localhost:3000/api";

    // Input validation test cases
    describe("GET /activities", async () => {
        const testCases = [
            { input: "London", expectedStatusCode: "200" },
            { input: "New York", expectedStatusCode: "200" },
            { input: "Saint-Tropez", expectedStatusCode: "200" },
            { input: 'L"Aquila', expectedStatusCode: "200" },
            { input: "São Paulo", expectedStatusCode: "200" },
        ];

        testCases.forEach(({ input, expectedStatusCode }) => {
            it(`should return ${expectedStatusCode} for input: ${input}`, async () => {
                const response: AxiosResponse<WeatherResponse> = await axios.get(
                    `${BASE_URL}/activities/${input}`,
                );

                expect(response.status).to.equal(expectedStatusCode);
            });
        });
    });

    // Schema validation test cases
    describe("GET /activities with valid location", async () => {
        it("should return exactly seven days of data", async () => {
            const response: AxiosResponse<WeatherResponse> = await axios.get(
                `${BASE_URL}/activities/london`,
            );

            expect(response.data).to.have.lengthOf(7);
        });

        it("should return the date for each day of data", async () => {
            const response: AxiosResponse<WeatherResponse> = await axios.get(
                `${BASE_URL}/activities/london`,
            );

            response.data.forEach((day) => {
                expect(day).to.have.property("date");
                expect(day.date).to.match(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format
            });
        });

        it("should return 4 activities for every day", async () => {
            const response: AxiosResponse<WeatherResponse> = await axios.get(
                `${BASE_URL}/activities/london`,
            );

            for (let day = 0; day < 7; day++) {
                expect(response.data[day].activities).to.have.lengthOf(4);
            }
        });

        it("should return ranks for each activity for each day", async () => { });

        it("should return reasoning for each activity for each day", async () => { });

        it("should return valid activity names", async () => { });
    });

    // Error handling test cases
    describe("GET /activities request with invalid location", async () => {
        const invalidLocations = [
            { input: "", expectedStatusCode: "400" },
            { input: " ", expectedStatusCode: "400" },
            { input: "InvalidLocation123", expectedStatusCode: "400" },
            { input: "12345", expectedStatusCode: "400" },
            { input: "!!!", expectedStatusCode: "400" },
            { input: "Mount Everest", expectedStatusCode: "400" },
            { input: "SW1A 1AA", expectedStatusCode: "400" },
            { input: "Buckinghamshire", expectedStatusCode: "400" },
        ];
        invalidLocations.forEach(({ input, expectedStatusCode }) => {
            it(`should return ${expectedStatusCode} for input: ${input}`, async () => {
                const response: AxiosResponse<WeatherResponse> = await axios.get(
                    `${BASE_URL}/activities/${input}`,
                );

                expect(response.status).to.equal(expectedStatusCode);
            });
        });
    });

    describe("GET /activities request with empty location", async () => {
        it("should return 400 for empty location", async () => {
            try {
                await axios.get(`${BASE_URL}/activities/`);
            } catch (error) {
                expect(error.response.status).to.equal(400);
            }
        });
    });

    // I'm unsure what the implementation of this test would look like, as the request made tp the open-meteo API
    // is not directly controlled by this codebase.
    // describe("Request to open-meteo endpoint with invalid coordinates", async () => {})

    // I'm unsure what the implementation of this test would look like, as the request made tp the open-meteo API
    // is not directly controlled by this codebase.
    // describe("Response from open-meteo endpoint is missing weather data", async () => {})

    //Ranking Logic Tests
    describe("Activity Ranking Logic", async () => {
        const testCases = [
            {
                day: 1,
                weather: "Clear Sky, Good Visibility, Cold",
                skiing_rank: 1,
                surfing_rank: 4,
                outdoor_rank: 3,
                indoor_rank: 2,
            },
            {
                day: 2,
                weather: "Clear Sky, Good Visibility, Warm",
                skiing_rank: 4,
                surfing_rank: 2,
                outdoor_rank: 1,
                indoor_rank: 3,
            },
            {
                day: 3,
                weather: "Rain, Good Visibility, Cold",
                skiing_rank: 4,
                surfing_rank: 3,
                outdoor_rank: 2,
                indoor_rank: 1,
            },
            {
                day: 4,
                weather: "Some Cloud, Good Visibility, Warm",
                skiing_rank: 4,
                surfing_rank: 1,
                outdoor_rank: 2,
                indoor_rank: 3,
            },
            {
                day: 5,
                weather: "Rain, Good Visibility, Cold",
                skiing_rank: 4,
                surfing_rank: 3,
                outdoor_rank: 2,
                indoor_rank: 1,
            },
            {
                day: 6,
                weather: "Some Cloud, Good Visibility, Warm",
                skiing_rank: 4,
                surfing_rank: 1,
                outdoor_rank: 2,
                indoor_rank: 3,
            },
            {
                day: 7,
                weather: "Rain, Good Visibility, Cold",
                skiing_rank: 4,
                surfing_rank: 3,
                outdoor_rank: 2,
                indoor_rank: 1,
            },
        ];
        describe("should rank activities based on weather conditions", async () => {
            testCases.forEach(
                ({
                    day,
                    weather,
                    skiing_rank,
                    surfing_rank,
                    outdoor_rank,
                    indoor_rank,
                }) => {
                    it(`should rank activities correctly for weather: ${weather}`, async () => {
                        const response: AxiosResponse<WeatherResponse> = await axios.get(
                            `${BASE_URL}/activities/london`,
                        );

                        const dayData = response.data[day];
                        const activities = dayData.activities;

                        // Find each activity and check its rank and reasoning
                        const skiing = activities.find(
                            (activity) => activity.name === "skiing",
                        );
                        const surfing = activities.find(
                            (activity) => activity.name === "surfing",
                        );
                        const outdoor = activities.find(
                            (activity) => activity.name === "outdoor",
                        );
                        const indoor = activities.find(
                            (activity) => activity.name === "indoor",
                        );

                        expect(skiing).to.deep.include({
                            rank: skiing_rank,
                            reasoning: weather,
                        });

                        expect(surfing).to.deep.include({
                            rank: surfing_rank,
                            reasoning: weather,
                        });

                        expect(outdoor).to.deep.include({
                            rank: outdoor_rank,
                            reasoning: weather,
                        });

                        expect(indoor).to.deep.include({
                            rank: indoor_rank,
                            reasoning: weather,
                        });
                    });
                },
            );
        });
    });
});
