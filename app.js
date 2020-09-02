const weather = [];
const fakeWeatherData = [];
const temperature = document.querySelector("#temperature");
const date = document.querySelector("#date");
const addRecordBtn = document.querySelector("#add");
const calculateAvgBtn = document.querySelector("#average");
const getMaxBtn = document.querySelector("#maxTemp");
const getMinBtn = document.querySelector("#minTemp");
const seedBtn = document.querySelector("#seed");
const results = document.querySelector("#results");
const tbody = document.querySelector("#tbody");

// Add Record Button: update weather table when add button is clicked
addRecordBtn.addEventListener("click", (event) => {
  event.preventDefault();
  weather.push({ temp: temperature.value, date: date.value });
  const weatherTable = weather
    .map((item) => {
      return `<tr>
                <td>${item.temp}</td>
                <td>${item.date}</td>
            </tr>`;
    })
    .join("");

  tbody.innerHTML = weatherTable;
});

// Seed data Button: load weather chart with seed button
seedBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //Random temperature and dates(Jan to Oct)
  for (i = 1; i < 10; i++) {
    fakeWeatherData.push({
      temperature: generateRandomTemperature(),
      date: `2020-${i}-${generateRandomDate()}`,
    });
  }

  //To generate table dynamically
  const weatherTable = fakeWeatherData
    .map((item) => {
      return `<tr>
                <td>${item.temperature}</td>
                <td>${item.date}</td>
            </tr>`;
    })
    .join("");

  tbody.innerHTML = weatherTable;
});

// function to generate fake temperatures between 5 and 40
generateRandomTemperature = () => {
  return Math.floor(Math.random() * 35) + 5;
};

// function to generate fake dates(number) between 10 and 30
generateRandomDate = () => {
  return Math.floor(Math.random() * 20) + 10;
};
