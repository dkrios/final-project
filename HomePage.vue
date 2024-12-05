<template>
  <div :style="{ backgroundImage: 'url(' + weatherImageUrl + ')'}">
    <h2>Welcome to the Weather App</h2>
    <p>Get the latest weather updates right here!</p>

    <!-- Search Bar -->
    <input
      v-model="city"
      placeholder="Enter city name"
      @keydown.enter="fetchCurrentWeather(city)"
    />
    <button @click="fetchCurrentWeather(city)">Search</button>

   

    <div v-if="weather">
      <p>Current Weather in {{ weather.city_name }}, {{ weather.state_code }}, {{ weather.country_code }}:</p>
<p>{{ convertToFahrenheit(weather.temp) }}°F, {{ weather.weather.description }}</p>
<p>High: {{ convertToFahrenheit(weather.high_temp) }}°F, Low: {{ convertToFahrenheit(weather.low_temp) }}°F</p>

      <button @click="saveLocation(weather.city_name)">Save Location</button>
    </div>
    <div v-else-if="loading">Loading current weather...</div>
    <div v-else-if="error">{{ error }}</div>

    <!-- Saved Locations -->
    <div class="saved-locations" v-if="locations.length">
      <h3>Saved Locations:</h3>
      <ul>
        <li v-for="(location, index) in locations" :key="index" class="list-group-item">
          {{ location }}
          <button @click="fetchCurrentWeather(location)">View Weather</button>
          <button @click="removeLocation(location)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      city: '',
      weather: null,
      loading: false,
      error: null,
      weatherImageUrl: '',
      locations: JSON.parse(localStorage.getItem('locations')) || [],
    };
  },
  methods: {
    async fetchCurrentWeather(city) {
      if (!city) return;

      this.loading = true;
      this.error = null;
      try {
        const apiKey = '207129c498334428af381ce5e7f16962'; 
        const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
        const response = await axios.get(url);
        const weatherData = response.data.data[0];


const tempCelsius = weatherData.temp || 0; 
const highCelsius = weatherData.max_temp || weatherData.app_max_temp || 0;
const lowCelsius = weatherData.min_temp || weatherData.app_min_temp || 0;


this.weather = {
  ...weatherData,
  temp: tempCelsius,
  high_temp: highCelsius,
  low_temp: lowCelsius,
};


        this.weatherImageUrl = this.getWeatherImage(weatherData.weather.description);
      } catch (err) {
        this.error = 'Failed to fetch current weather data. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    convertToFahrenheit(celsius) {
      return ((celsius * 9) / 5 + 32).toFixed(1);
    },
    getWeatherImage(description) {
      if (description.toLowerCase().includes('clear')) {
        return 'assets/clear-day.jpg';
      } else if (description.toLowerCase().includes('rain')) {
        return 'assets/rainy-day.jpg';
      } else if (description.toLowerCase().includes('snow')) {
        return 'assets/snowy-day.jpg';
      }
      return 'assets/default-weather.jpg';
    },
    saveLocation(city) {
      if (!this.locations.includes(city)) {
        this.locations.push(city);
        localStorage.setItem('locations', JSON.stringify(this.locations));
      }
    },
    removeLocation(city) {
      this.locations = this.locations.filter(location => location !== city);
      localStorage.setItem('locations', JSON.stringify(this.locations));
    },
  },
  mounted() {
    this.fetchCurrentWeather('Raleigh'); 
  },
};

</script>



<style scoped>
/* Global Styles */

body {
  margin: 0;
  text-align: center;
  align-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
}

main {
  margin: 0;
  text-align: center;
  align-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
}

.weather-container {
  background-size: cover;
  background-position: center;
  padding: 20px;
  color: white;
}

.saved-locations {
  background-image: url('@/assets/weather-cold.jpg');
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
}

.saved-locations h3,
.saved-locations ul {
  margin: 0;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #0056b3;
}

/* Container */
.container {
  max-width: 100px;
  margin: auto;
  padding: 20px;
  text-align: center;
  align-content: center;
  align-items: center;
}

/* Header Section */
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
  align-content: center;
  align-items: center;
}

p {
  text-align: center;
  font-size: 1.1rem;
  color: #7f8c8d;
  text-align: center;
  align-content: center;
  align-items: center;
}

/* Search Bar */
input {
  width: 60%;
  padding: 10px;
  margin-left: 500px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

button {
  padding: 10px 15px;
  background-color: #3498db;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  align-content: center;
  align-items: center;
}

button:hover {
  background-color: #2980b9;
}

/* Weather Info Card */
.card {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card h3 {
  font-size: 20px;
  margin-bottom: 15px;
}

.card .card-text {
  font-size: 20px;
  font-weight: bold;
  color: #2980b9;
}

/* Saved Locations */
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ecf0f1;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  align-content: center;
  max-width: 1200px;
  margin: auto;
}

.list-group-item button {
  padding: 10px 15px;
  background-color: #3498db;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  align-content: center;
  align-items: center;
  width: 60%;
  padding: 10px;
  margin-left: 500px;
  max-width: 200px;
  margin: auto;
  padding: 20px;
}

/* Loading/Error Message */
.text-center {
  text-align: center;
  align-content: center;
  align-items: center;
  font-size: 1.2rem;

}

.text-white {
  color: white;
}

header {
  text-align: center;
  align-content: center;
  align-items: center;
  width: 60%;
  padding: 10px;
  margin-left: 500px;
}

/* Center the Save Location button */
button {
  display: block;
  margin: 0 auto;
}

/* Center the Saved Locations section */
.saved-locations {
  text-align: center;
}



.text-danger {
  color: #e74c3c;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  input {
    width: 80%;
  }
}

</style>
