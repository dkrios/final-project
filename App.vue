<template>
  <div id="app" :class="backgroundClass">
    <header>
      <h1>Weather App</h1>

    </header>
    <main>
      <nav>
      <WeatherDisplay :weather="weather" />
      <router-link to="/">Home Page</router-link>
      <router-link to="/hourly">Hourly Forecast</router-link>
      <router-link to="/forecast">5-Day Forecast</router-link>
    </nav>
      <router-view></router-view> 
      
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {

  data() {
    return {
      weather: null,
      backgroundClass: ''
    };
  },
  methods: {
    async fetchWeather(city) {
      const apiKey = '207129c498334428af381ce5e7f16962';
      const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
      const response = await axios.get(url);
      this.weather = response.data.data[0]; 
      this.setWeatherBackground();
    },
    setWeatherBackground() {
      const condition = this.weather.weather.description;
      if (condition === 'Clear Sky') {
        this.backgroundClass = 'weather-clear';
      } else if (condition.includes('Cloud')) {
        this.backgroundClass = 'weather-cloudy';
      } else if (condition.includes('Rain')) {
        this.backgroundClass = 'weather-rainy';
      } else if (this.weather.temp < 10) {
        this.backgroundClass = 'weather-cold';
      } else {
        this.backgroundClass = 'weather-warm';
      }
    }
  },
  mounted() {
    this.fetchWeather('Raleigh');
  }
};
</script>

<style scoped>

template {
  background-image: url(assets/weather-cold.jpg);
}

body {
  background-color:#b6deff;
}

nav {
  background-color: #877eff;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-weight: bold;
}

header {
  text-align: center;
  align-content: center;
  align-items: center;
}

nav a:hover {
  color: #adafff;
  text-decoration: underline;
}

nav .active {
  border-bottom: 2px solid #ff6600;
}

</style>
