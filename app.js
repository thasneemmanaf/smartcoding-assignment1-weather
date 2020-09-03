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
    weather.push({ temperature: temperature.value, date: date.value });
    const weatherTable = weather
      .map((item) => {
        return `<tr>
                <td>${item.temperature}</td>
                <td>${item.date}</td>
            </tr>`;
      })
      .join("");

    tbody.innerHTML = weatherTable;
  }
});

// GetMax Button: To get highest temperature
getMaxBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const sortedTemperatureArray = bubbleSortTemperature();
  const highestTemperature =
    sortedTemperatureArray[sortedTemperatureArray.length - 1];
  results.textContent = `Higest temperature is: ${highestTemperature}`;
});

// GetMin Button: To get lowest temperature
getMinBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const sortedTemperatureArray = bubbleSortTemperature();
  const lowestTemperature = sortedTemperatureArray[0];
  results.textContent = `Lowest temperature is: ${lowestTemperature}`;
});

// Calculate Average Button: To get average temperature
calculateAvgBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let sum = 0;
  weather.forEach((item) => {
    sum += parseInt(item.temperature);
  });
  const avgTemperature = sum / Object.keys(weather).length;
  results.textContent = `Average temperature is: ${avgTemperature}`;
});

// Seed data Button: load weather chart with seed button
seedBtn.addEventListener("click", (event) => {
  event.preventDefault();

  //Random temperature and dates(Jan to Dec)
  for (i = 1; i < 13; i++) {
    fakeWeatherData.push({
      temperature: generateRandomNumber(5, 40),
      date: new Date(`2020-${i}-${generateRandomNumber(10, 30)}`).toISOString(),
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

// Function to generate randon number between max and min
generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Function to generate an array with only temperatures
getTemperatureArray = () => {
  let temperatureArray = [];
  temperatureArray = weather.map((item) => {
    return parseInt(item.temperature);
  });
  return temperatureArray;
};

// Function to sort temperature array using bubble sort
bubbleSortTemperature = () => {
  const temperatureArray = getTemperatureArray();
  for (i = 0; i < temperatureArray.length; i++) {
    for (j = 0; j < temperatureArray.length - i - 1; j++) {
      if (temperatureArray[j] > temperatureArray[j + 1]) {
        let temp = temperatureArray[j];
        temperatureArray[j] = temperatureArray[j + 1];
        temperatureArray[j + 1] = temp;
      }
    }
  }
  return temperatureArray;
};
