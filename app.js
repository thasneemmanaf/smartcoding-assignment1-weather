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
const error = document.querySelector("#error");

// Add Record Button: update weather table when add button is clicked
addRecordBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!temperature.value || !date.value) {
    error.textContent = "Please enter a valid value";
  } else {
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
  }
});

// Seed data Button: load weather chart with seed button
seedBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //Random temperature and dates(Jan to Oct)
  for (i = 1; i < 10; i++) {
    fakeWeatherData.push({
      temperature: generateRandomNumber(5, 40),
      date: `2020-${i}-${generateRandomNumber(10, 30)}`,
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

// function to generate randon number between max and min
generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
