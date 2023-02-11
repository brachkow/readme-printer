import { createApp } from 'vue';
import App from './App.vue';
import { inject } from '@vercel/analytics';
import 'github-markdown-css/github-markdown-light.css';

const app = createApp(App);

inject();

app.mount('#app');
