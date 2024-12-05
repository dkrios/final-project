import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


if (document.querySelector('#app')) {
    const app = createApp(App);
    app.use(router).mount('#app');
    console.log('Vue app mounted successfully');
} else {
    console.error('Error: #app element not found in the DOM');
}
