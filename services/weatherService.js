import axios from 'axios';

const API_KEY = '207129c498334428af381ce5e7f16962'; 
const BASE_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';

export const fetchForecast = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        city: city,
        key: API_KEY,
        units: 'I', 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw new Error('Could not fetch forecast data. Please try again.');
  }
};
