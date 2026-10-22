/* =========================================
   ELEMENTS
========================================= */

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const locationBtn =
    document.getElementById("locationBtn");

const rainTestBtn =
    document.getElementById("rainTestBtn");

let weatherChart = null;

let rainTestMode = false;


/* =========================================
   WEATHER INFORMATION
========================================= */

function getWeatherInfo(code) {

    const weather = {

        0: {
            text: "Clear Sky",
            icon: "☀️"
        },

        1: {
            text: "Mainly Clear",
            icon: "🌤️"
        },

        2: {
            text: "Partly Cloudy",
            icon: "⛅"
        },

        3: {
            text: "Cloudy",
            icon: "☁️"
        },

        45: {
            text: "Fog",
            icon: "🌫️"
        },

        48: {
            text: "Fog",
            icon: "🌫️"
        },

        51: {
            text: "Light Drizzle",
            icon: "🌦️"
        },

        53: {
            text: "Drizzle",
            icon: "🌦️"
        },

        55: {
            text: "Heavy Drizzle",
            icon: "🌧️"
        },

        61: {
            text: "Light Rain",
            icon: "🌦️"
        },

        63: {
            text: "Rain",
            icon: "🌧️"
        },

        65: {
            text: "Heavy Rain",
            icon: "🌧️"
        },

        71: {
            text: "Light Snow",
            icon: "🌨️"
        },

        73: {
            text: "Snow",
            icon: "❄️"
        },

        75: {
            text: "Heavy Snow",
            icon: "❄️"
        },

        80: {
            text: "Rain Showers",
            icon: "🌦️"
        },

        81: {
            text: "Rain Showers",
            icon: "🌧️"
        },

        82: {
            text: "Heavy Rain Showers",
            icon: "🌧️"
        },

        95: {
            text: "Thunderstorm",
            icon: "⛈️"
        },

        96: {
            text: "Thunderstorm",
            icon: "⛈️"
        },

        99: {
            text: "Thunderstorm",
            icon: "⛈️"
        }

    };

    return weather[code] || {
        text: "Unknown",
        icon: "🌡️"
    };
}


/* =========================================
   TIME
========================================= */

function formatTime(time) {

    if (!time) {
        return "--:--";
    }

    const date = new Date(time);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
}


/* =========================================
   BACKGROUND + WEATHER EFFECT
========================================= */

function updateBackground(
    isDay,
    weatherCode
) {

    const sun =
        document.querySelector(".sun");

    const moon =
        document.querySelector(".moon");


    /* DAY / NIGHT */

    if (sun) {
        sun.style.opacity =
            isDay ? "1" : "0";
    }

    if (moon) {
        moon.style.opacity =
            isDay ? "0" : "0.85";
    }


    /* KEEP ORIGINAL CINEMATIC BACKGROUND */

    if (isDay) {

        document.body.style.background = `
            radial-gradient(
                circle at 70% 10%,
                rgba(255,180,70,.22),
                transparent 30%
            ),
            linear-gradient(
                135deg,
                #081427,
                #0a2039,
                #07101f
            )
        `;

    } else {

        document.body.style.background = `
            radial-gradient(
                circle at 70% 15%,
                rgba(80,100,180,.18),
                transparent 30%
            ),
            linear-gradient(
                135deg,
                #02040b,
                #071022,
                #03050c
            )
        `;
    }


    /* REMOVE OLD WEATHER CLASSES */

    document.body.classList.remove(
        "weather-clear",
        "weather-cloudy",
        "weather-rain",
        "weather-storm",
        "weather-snow",
        "weather-fog"
    );


    /* AUTOMATIC WEATHER EFFECTS */

    if (
        [95, 96, 99].includes(weatherCode)
    ) {

        document.body.classList.add(
            "weather-storm"
        );

    }

    else if (
        [
            51, 53, 55,
            56, 57,
            61, 63, 65,
            66, 67,
            80, 81, 82
        ].includes(weatherCode)
    ) {

        document.body.classList.add(
            "weather-rain"
        );

    }

    else if (
        [
            71, 73, 75,
            77, 85, 86
        ].includes(weatherCode)
    ) {

        document.body.classList.add(
            "weather-snow"
        );

    }

    else if (
        [45, 48].includes(weatherCode)
    ) {

        document.body.classList.add(
            "weather-fog"
        );

    }

    else if (
        [1, 2, 3].includes(weatherCode)
    ) {

        document.body.classList.add(
            "weather-cloudy"
        );

    }

    else {

        document.body.classList.add(
            "weather-clear"
        );
    }
}


/* =========================================
   GET WEATHER
========================================= */

async function getWeather(
    latitude,
    longitude,
    cityName,
    country
) {

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast` +

            `?latitude=${latitude}` +
            `&longitude=${longitude}` +

            `&current=` +
            `temperature_2m,` +
            `relative_humidity_2m,` +
            `apparent_temperature,` +
            `is_day,` +
            `weather_code,` +
            `surface_pressure,` +
            `wind_speed_10m,` +
            `wind_direction_10m` +

            `&hourly=` +
            `temperature_2m,` +
            `weather_code,` +
            `precipitation_probability` +

            `&daily=` +
            `sunrise,` +
            `sunset,` +
            `uv_index_max` +

            `&timezone=auto`;


        const response =
            await fetch(url);


        if (!response.ok) {
            throw new Error(
                "Weather API failed"
            );
        }


        const data =
            await response.json();


        updateUI(
            data,
            cityName,
            country
        );

    }

    catch (error) {

        console.error(
            "Weather error:",
            error
        );

        alert(
            "Weather data load nahi ho pa raha."
        );
    }
}


/* =========================================
   UPDATE UI
========================================= */

function updateUI(
    data,
    cityName,
    country
) {

    const current =
        data.current;

    const daily =
        data.daily;

    const weatherInfo =
        getWeatherInfo(
            current.weather_code
        );


    document.getElementById(
        "locationName"
    ).textContent =
        cityName;


    document.getElementById(
        "countryName"
    ).textContent =
        country;


    document.getElementById(
        "temperature"
    ).textContent =
        Math.round(
            current.temperature_2m
        );


    document.getElementById(
        "feelsLike"
    ).textContent =
        Math.round(
            current.apparent_temperature
        ) + "°";


    document.getElementById(
        "feelsLike2"
    ).textContent =
        Math.round(
            current.apparent_temperature
        ) + "°";


    document.getElementById(
        "weatherDescription"
    ).textContent =
        weatherInfo.text;


    document.getElementById(
        "weatherIcon"
    ).textContent =
        weatherInfo.icon;


    document.getElementById(
        "humidity"
    ).textContent =
        current.relative_humidity_2m
        + "%";


    document.getElementById(
        "windSpeed"
    ).textContent =
        Math.round(
            current.wind_speed_10m
        ) + " km/h";


    document.getElementById(
        "pressure"
    ).textContent =
        Math.round(
            current.surface_pressure
        ) + " hPa";


    document.getElementById(
        "sunrise"
    ).textContent =
        formatTime(
            daily.sunrise[0]
        );


    document.getElementById(
        "sunset"
    ).textContent =
        formatTime(
            daily.sunset[0]
        );


    document.getElementById(
        "sunset2"
    ).textContent =
        formatTime(
            daily.sunset[0]
        );


    document.getElementById(
        "uv"
    ).textContent =
        daily.uv_index_max[0];


    document.getElementById(
        "uvText"
    ).textContent =
        daily.uv_index_max[0];


    document.getElementById(
        "windDirection"
    ).textContent =
        current.wind_direction_10m
        + "°";


    document.getElementById(
        "dayNight"
    ).textContent =
        current.is_day
            ? "Day"
            : "Night";


    document.getElementById(
        "weatherCode"
    ).textContent =
        current.weather_code;


    document.getElementById(
        "rainChance"
    ).textContent =
        data.hourly
            .precipitation_probability[0]
        + "%";


    /* IMPORTANT */

    updateBackground(
        current.is_day,
        current.weather_code
    );


    createHourlyForecast(
        data.hourly
    );


    createChart(
        data.hourly
    );
}


/* =========================================
   HOURLY FORECAST
========================================= */

function createHourlyForecast(hourly) {

    const container =
        document.getElementById(
            "hourlyForecast"
        );

    container.innerHTML = "";


    const now = new Date();

    const currentHour =
        now.getHours();


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const index =
            currentHour + i;


        if (
            index >=
            hourly.time.length
        ) {
            break;
        }


        const date =
            new Date(
                hourly.time[index]
            );


        const info =
            getWeatherInfo(
                hourly.weather_code[index]
            );


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "hour-card";


        card.innerHTML = `

            <small>
                ${
                    i === 0
                        ? "Now"
                        : date.toLocaleTimeString(
                            [],
                            {
                                hour: "numeric"
                            }
                        )
                }
            </small>

            <span>
                ${info.icon}
            </span>

            <strong>
                ${Math.round(
                    hourly.temperature_2m[index]
                )}°
            </strong>

        `;


        container.appendChild(card);
    }
}


/* =========================================
   CHART
========================================= */

function createChart(hourly) {

    const canvas =
        document.getElementById(
            "weatherChart"
        );


    const now = new Date();

    const currentHour =
        now.getHours();


    const labels = [];

    const temperatures = [];


    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const index =
            currentHour + i;


        if (
            index >=
            hourly.time.length
        ) {
            break;
        }


        const date =
            new Date(
                hourly.time[index]
            );


        labels.push(
            date.toLocaleTimeString(
                [],
                {
                    hour: "numeric"
                }
            )
        );


        temperatures.push(
            Math.round(
                hourly.temperature_2m[index]
            )
        );
    }


    if (weatherChart) {
        weatherChart.destroy();
    }


    weatherChart =
        new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels: labels,

                    datasets: [

                        {
                            label:
                                "Temperature",

                            data:
                                temperatures,

                            borderColor:
                                "#70c7ff",

                            backgroundColor:
                                "rgba(112,199,255,.10)",

                            borderWidth: 2,

                            fill: true,

                            tension: .4,

                            pointRadius: 3
                        }

                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false,

                    plugins: {

                        legend: {
                            display: false
                        }
                    },

                    scales: {

                        x: {

                            ticks: {
                                color:
                                    "rgba(255,255,255,.4)",

                                maxTicksLimit: 8
                            },

                            grid: {
                                display: false
                            }
                        },

                        y: {

                            ticks: {

                                color:
                                    "rgba(255,255,255,.4)",

                                callback:
                                    value =>
                                        value + "°"
                            },

                            grid: {

                                color:
                                    "rgba(255,255,255,.06)"
                            }
                        }
                    }
                }
            }
        );
}


/* =========================================
   CITY SEARCH
========================================= */

async function searchCity(cityName = null) {

    const city =
        cityName ||
        cityInput.value.trim();


    if (!city) {

        alert(
            "Please enter a city name."
        );

        return;
    }


    try {

        const response =
            await fetch(

                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`

            );


        if (!response.ok) {

            throw new Error(
                "Search request failed"
            );
        }


        const data =
            await response.json();


        if (
            !data.results ||
            data.results.length === 0
        ) {

            alert(
                "City not found."
            );

            return;
        }


        const result =
            data.results[0];


        getWeather(

            result.latitude,

            result.longitude,

            result.name,

            result.country

        );

    }

    catch (error) {

        console.error(
            "Search error:",
            error
        );

        alert(
            "Unable to search city."
        );
    }
}


/* =========================================
   SEARCH BUTTON
========================================= */

searchBtn.addEventListener(
    "click",
    () => {
        searchCity();
    }
);


/* =========================================
   ENTER KEY
========================================= */

cityInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            searchCity();

        }
    }
);


/* =========================================
   LOCATION
========================================= */

locationBtn.addEventListener(
    "click",
    () => {

        if (
            !navigator.geolocation
        ) {

            alert(
                "Geolocation supported nahi hai."
            );

            return;
        }


        navigator.geolocation.getCurrentPosition(

            (position) => {

                getWeather(

                    position.coords.latitude,

                    position.coords.longitude,

                    "Your Location",

                    "India"

                );
            },

            () => {

                alert(
                    "Location access allow karo."
                );
            }
        );
    }
);


/* =========================================
   🌧️ RAIN TEST
========================================= */

rainTestBtn.addEventListener(
    "click",
    () => {

        rainTestMode =
            !rainTestMode;


        if (rainTestMode) {

            document.body.classList.remove(
                "weather-clear",
                "weather-cloudy",
                "weather-storm",
                "weather-snow",
                "weather-fog"
            );


            document.body.classList.add(
                "weather-rain"
            );


            rainTestBtn.classList.add(
                "active"
            );


            rainTestBtn.textContent =
                "☀️ Stop Rain";

        }

        else {

            document.body.classList.remove(
                "weather-rain"
            );


            rainTestBtn.classList.remove(
                "active"
            );


            rainTestBtn.textContent =
                "🌧️ Test Rain";


            /*
             * Reload actual weather
             */

            const currentCity =
                document.getElementById(
                    "locationName"
                ).textContent;


            if (
                currentCity &&
                currentCity !== "Your Location"
            ) {

                searchCity(
                    currentCity
                );
            }
        }
    }
);


/* =========================================
   START APP
========================================= */

searchCity("Bhopal");