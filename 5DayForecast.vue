<template>
  <div class="forecast">
    <h2>5-Day Weather Forecast</h2>
    <form @submit.prevent="searchForecast">
      <input type="text" v-model="searchCity" placeholder="Enter a city" />
      <button type="submit">Search</button>
    </form>
    <div v-if="forecast">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weather</th>
            <th>High Temp (°F)</th>
            <th>Low Temp (°F)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in forecast" :key="day.datetime">
            <td>{{ formatDate(day.valid_date) }}</td>
            <td>{{ day.weather.description }}</td>
            <td>{{ convertToFahrenheit(day.max_temp) }}°F</td>
            <td>{{ convertToFahrenheit(day.min_temp) }}°F</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="loading">Loading forecast data...</div>
    <div v-else-if="error">{{ error }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      forecast: null,
      loading: false,
      error: null,
      searchCity: '',
    };
  },
  methods: {
    async fetchForecastData(city) {
      this.loading = true;
      this.error = null;
      try {
        const apiKey = '207129c498334428af381ce5e7f16962';
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}&days=5`;
        const response = await axios.get(url);
        this.forecast = response.data.data;
      } catch (err) {
        this.error = 'Failed to fetch forecast data. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    searchForecast() {
      if (this.searchCity.trim()) {
        this.fetchForecastData(this.searchCity.trim());
      }
    },
    convertToFahrenheit(celsius) {
      return (celsius * 9/5) + 32;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  },
  mounted() {
    this.fetchForecastData('Raleigh');
  },
};
</script>

<style scoped>
body {
  background-color:#b6deff;
}

.forecast {
  margin: 20px;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.loading {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

form {
  margin-bottom: 20px;
}

input {
  padding: 8px;
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
