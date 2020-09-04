let weather = [];
const temperature = document.querySelector("#temperature");
const date = document.querySelector("#date");
const addRecordBtn = document.querySelector("#add");
const calculateAvgBtn = document.querySelector("#average");
const getMaxBtn = document.querySelector("#maxTemp");
const getMinBtn = document.querySelector("#minTemp");
const seedBtn = document.querySelector("#seed");
const results = document.querySelector("#results");
const tbody = document.querySelector("#tbody");
const thead = document.querySelector("#thead");
const error = document.querySelector("#error");

// Add Record Button: update weather table when add button is clicked
addRecordBtn.addEventListener("click", (event) => {
  event.preventDefault();
  results.textContent = "";
  const isFormValid = checkFormValidation(temperature, date);
  if (isFormValid) {
    submitForm();
    // const temperatureArray = getTemperatureArray();
    // const dateArray = getDateArray();
    loadWeatherChart(weather);
  }
});

// GetMax Button: To get highest temperature
getMaxBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const sortedWeather = sortWeather(weather);
  const highestTemperature =
    sortedWeather[sortedWeather.length - 1]["temperature"];
  results.textContent = `Higest temperature is: ${highestTemperature}`;
});

// GetMin Button: To get lowest temperature
getMinBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const sortedWeather = sortWeather(weather);
  const lowestTemperature = sortedWeather[0]["temperature"];
  results.textContent = `Lowest temperature is: ${lowestTemperature}`;
});

// Calculate Average Button: To get average temperature
calculateAvgBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let sum = 0;
  weather.forEach((item) => {
    sum += parseInt(item.temperature);
  });
  const avgTemperature = (sum / Object.keys(weather).length).toFixed(2);
  results.textContent = `Average temperature is: ${avgTemperature}`;
});

// Seed data Button: load weather chart with seed button
seedBtn.addEventListener("click", (event) => {
  event.preventDefault();
  results.textContent = "";
  weather = [];
  //Random temperature and dates(Jan to Dec)
  for (i = 1; i < 13; i++) {
    weather.push({
      temperature: generateRandomNumber(5, 40),
      date: new Date(
        `2020-${generateRandomNumber(1, 13)}-${generateRandomNumber(10, 30)}`
      ).toISOString(),
    });
  }
  weather = sortWeather(weather, "date"); //Sort weather before generating the table

  //To generate table dynamically
  const weatherTable = weather
    .map((item) => {
      return `<tr>
                <td>${item.temperature}</td>
                <td>${item.date}</td>
            </tr>`;
    })
    .join("");
  thead.innerHTML = "<th>Temperature</th><th>Date</th>";
  tbody.innerHTML = weatherTable;

  loadWeatherChart(weather);
});

// Function to generate randon number between max and min
generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Function to sort temperature array using bubble sort
sortTemperatures = () => {
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

// To validate form
checkFormValidation = (temperature, date) => {
  const errorTemperature = temperature.parentElement.querySelector(".error");
  const errorDate = date.parentElement.querySelector(".error");
  if (temperature.value.trim() === "" && date.value.trim() === "") {
    errorTemperature.textContent = "Temperature cannot be empty";
    errorDate.textContent = "Date cannot be empty";
    temperature.classList.add("form__input--error");
    date.classList.add("form__input--error");
    return false;
  } else if (temperature.value.trim() === "") {
    errorTemperature.textContent = "Temperature cannot be empty";
    errorDate.textContent = "";
    temperature.classList.add("form__input--error");
    date.classList.remove("form__input--error");
    return false;
  } else if (date.value.trim() === "") {
    errorDate.textContent = "Date cannot be empty";
    errorTemperature.textContent = "";
    date.classList.add("form__input--error");
    temperature.classList.remove("form__input--error");
    return false;
  } else {
    errorTemperature.textContent = "";
    errorDate.textContent = "";
    temperature.classList.remove("form__input--error");
    date.classList.remove("form__input--error");
    return true;
  }
};

// Function to add records if form validation is successful
submitForm = () => {
  weather.push({
    temperature: temperature.value,
    date: new Date(date.value).toISOString(),
  });
  weather = sortWeather(weather, "date");
  const weatherTable = weather
    .map((item) => {
      return `<tr>
                <td>${item.temperature}</td>
                <td>${item.date}</td>
            </tr>`;
    })
    .join("");
  thead.innerHTML = "<th>Temperature</th><th>Date</th>";
  tbody.innerHTML = weatherTable;
};

// Function to sort weather based on sortBy parameter using bubble sort
sortWeather = (weather, sortBy = "temperature") => {
  for (i = 0; i < weather.length; i++) {
    for (j = 0; j < weather.length - i - 1; j++) {
      if (weather[j][sortBy] > weather[j + 1][sortBy]) {
        let temp = weather[j];
        weather[j] = weather[j + 1];
        weather[j + 1] = temp;
      }
    }
  }
  return weather;
};

// function to load weather chart
loadWeatherChart = (weather) => {
  // Convert date from ISO format to YYYY-MM-DD and create date label for x-axis
  const dateLabel = weather.map((item) => {
    dateObject = new Date(item.date);
    let date = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    return `${year}-${month}-${date}`;
  });
  // create temperature label for y-axis
  const temperatureLabel = weather.map((item) => {
    return item.temperature;
  });

  let myChart = document.querySelector("#myChart").getContext("2d");
  new Chart(myChart, {
    type: "line",
    data: {
      labels: [...dateLabel], //  x-axis
      datasets: [
        {
          label: "Temperature",
          data: [...temperatureLabel], //  y-axis
          fill: false,
          borderWidth: 1,
          borderColor: "blue",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Weather Graph",
        fontSize: 25,
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "#000",
        },
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          bottom: 0,
          top: 0,
        },
      },
      tooltips: {
        enabled: true,
      },
    },
  });
};
