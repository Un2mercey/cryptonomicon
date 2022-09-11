import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import vuetify from '@/plugins/vuetify';

const store = createPinia();

createApp(App).use(router).use(i18n).use(store).use(vuetify).mount('#app');
