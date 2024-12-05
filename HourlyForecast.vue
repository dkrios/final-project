<template>
  <div>
    <h1>Hourly Weather Forecast</h1>
    <input
      v-model="city"
      placeholder="Enter city name"
      @keydown.enter="getWeather"
    />
    <button @click="getWeather">Search</button>


    <div v-if="loading">Loading...</div>

  
    <div v-if="error">{{ error }}</div>


    <div v-if="hourlyData">
      <h3>Hourly Forecast for {{ city }}:</h3>
      <ul>
        <li v-for="item in hourlyData" :key="item.dt">
          {{ formatDate(item.dt) }}: {{ convertToFahrenheit(item.temp) }}°F
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: '',
      hourlyData: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async getWeather() {
      if (!this.city) return;

      this.loading = true;
      this.error = null;

      try {
        const apiKey = '207129c498334428af381ce5e7f16962';
        const url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${this.city}&key=${apiKey}`;
        const response = await axios.get(url);
        this.hourlyData = response.data.data;
      } catch (err) {
        console.error('Error:', err);
        this.error = 'Could not fetch hourly data. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    convertToFahrenheit(celsius) {
      return (celsius * 9) / 5 + 32;
    },
    formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
},
  },
};
</script>

<style scoped>
body {
  background-color:#b6deff;
}
</style>
