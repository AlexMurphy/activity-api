export const TEST_LOCATIONS = {
  NEW_CITIES: [
    { name: "New York" },
    { name: "New Orleans" },
    { name: "Newcastle" },
    { name: "Newport" },
    { name: "Newmarket" },
    { name: "New Glasgow" },
  ],
  SINGLE_LOCATION: [{ name: "New York" }],
  SPECIAL_CHARACTER_LOCATIONS: [
    { name: "Saint-Tropez" },
    { name: 'L"Aquila' },
    { name: "São Paulo" },
  ],
  INVALID_LOCATIONS: [
    "InvalidLocation123",
    "12345",
    "!!!",
    "Mount Everest",
    "SW1A 1AA",
    "Buckinghamshire",
  ],
};

export const WEATHER_DATA = [
  {
    day_number: 1,
    temperature: "Cold",
    precipitation: "Snow",
    wind_speed: "Light",
    cloud_cover: "Overcast",
    visibility: "Good",
  },
  {
    day_number: 2,
    temperature: "Warm",
    precipitation: "None",
    wind_speed: "Light",
    cloud_cover: "Clear",
    visibility: "Good",
  },
  {
    day_number: 3,
    temperature: "Mild",
    precipitation: "Heavy Rain",
    wind_speed: "Moderate",
    cloud_cover: "Overcast",
    visibility: "Poor",
  },
  {
    day_number: 4,
    temperature: "Cool",
    precipitation: "Light Rain",
    wind_speed: "Light",
    cloud_cover: "Mostly Cloudy",
    visibility: "Fair",
  },
  {
    day_number: 5,
    temperature: "Mild",
    precipitation: "None",
    wind_speed: "Strong",
    cloud_cover: "Partly Cloudy",
    visibility: "Good",
  },
  {
    day_number: 6,
    temperature: "Cold",
    precipitation: "Thunderstorm",
    wind_speed: "Strong",
    cloud_cover: "Overcast",
    visibility: "Poor",
  },
  {
    day_number: 7,
    temperature: "Warm",
    precipitation: "None",
    wind_speed: "Light",
    cloud_cover: "Partly Cloudy",
    visibility: "Good",
  },
];

export const EXPECTED_RANKINGS = [
  { day: 1, skiing_rank: 1, surfing_rank: 4, outdoor_rank: 3, indoor_rank: 2 },
  { day: 2, skiing_rank: 4, surfing_rank: 1, outdoor_rank: 2, indoor_rank: 3 },
  { day: 3, skiing_rank: 3, surfing_rank: 4, outdoor_rank: 4, indoor_rank: 1 },
  { day: 4, skiing_rank: 3, surfing_rank: 3, outdoor_rank: 3, indoor_rank: 1 },
  { day: 5, skiing_rank: 2, surfing_rank: 1, outdoor_rank: 3, indoor_rank: 4 },
  { day: 6, skiing_rank: 4, surfing_rank: 4, outdoor_rank: 4, indoor_rank: 1 },
  { day: 7, skiing_rank: 4, surfing_rank: 2, outdoor_rank: 1, indoor_rank: 3 },
];
