let weather = {
    "apiKey": "<-- YOUR OPEN WEATHER MAP API KEY -->",
    fetchWeather: function(city) {
        fetch(`<-- YOUR OPEN WEATHER MAP URL -->`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
        .catch((error) => this.displayError())
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search input").value)
    },
    displayWeather: function(data) {
        const { name } = data;
        const { description, icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(".temp").innerText = `${parseInt(temp)}°C`;
        document.querySelector(".image").src = `http://openweathermap.org/img/wn/${icon}.png`
        document.querySelector(".description").innerText = `${description}`;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".speed").innerText = `Wind speed: ${speed} km/h`;

        document.querySelector(".weather").classList.remove("loading")
        document.querySelector(".load").classList.remove("block")
        document.querySelector(".error").style.display = "none";
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`
    },
    displayError: function() {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".load").classList.remove("block")
    }
}

document.querySelector(".search button").addEventListener("click", function () {
    document.querySelector(".load").classList.add("block")
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").classList.add("loading")
    weather.search();
})

document.querySelector(".search").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        document.querySelector(".load").classList.add("block")
        document.querySelector(".weather").classList.add("loading")
        document.querySelector(".error").style.display = "none";
        weather.search();
    }
})
