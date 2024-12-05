import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomePage.vue';
import Forecast from '../components/5DayForecast.vue';
import HourlyChart from '@/components/HourlyChart.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/hourly', component: HourlyChart },  
  { path: '/forecast', component: Forecast },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
