<template>
    <div>
      <h2>Hourly Forecast for {{ city }}</h2>
      <input v-model="city" placeholder="Enter city" />
    <button @click="fetchHourlyData">Get Weather</button>
    <LineChart :data="chartData" :options="chartOptions" />
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>

import axios from 'axios';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

export default {
  components: {
    LineChart: Line, 
  },
  data() {
    return {
      city: 'Raleigh', 
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Temperature (°F)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 1,
          },
          {
            label: 'Rain (mm)',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true, 
          },
        },
      },
      error: null,
    };
  },
  async created() {
    try {
      await this.fetchHourlyData();
    } catch (error) {
      console.error('Error fetching data on creation:', error);
      this.error = 'Failed to load hourly data.';
    }
  },
  methods: {
    async fetchHourlyData() {
      const apiKey = '207129c498334428af381ce5e7f16962'; 
      const url = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${this.city}&key=${apiKey}&hours=12`;

      try {
        const response = await axios.get(url);
        if (response.data && response.data.data) {
          const hourlyData = response.data.data;

         
          this.chartData.labels = hourlyData.map(item =>
            this.formatDate(item.timestamp_utc)
          );
          this.chartData.datasets[0].data = hourlyData.map(item =>
            this.convertToFahrenheit(item.temp)
          );
          this.chartData.datasets[1].data = hourlyData.map(item => item.precip);
        } else {
          this.error = 'No data available for the city.';
        }
      } catch (error) {
        console.error('Error fetching hourly data:', error);
        this.error = 'Error fetching hourly data: ' + error.message;
      }
    },
    formatDate(timestamp) {
      
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    convertToFahrenheit(temp) {
  
      return (temp * 9) / 5 + 32;
    },
  },
};
  </script>
  
  <style scoped>

  body {
  background-color:#b6deff;
}

  h2 {
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  
  p {
    color: red;
    text-align: center;
    font-size: 1.2em;
  }
  
  .chart-container {
    margin-top: 20px;
  }
  </style>
  