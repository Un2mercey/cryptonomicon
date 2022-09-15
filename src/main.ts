import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { vuetify } from '@/plugins';
import { router } from '@/router';
import App from './App.vue';
import i18n from './i18n';

const store = createPinia();

createApp(App).use(router).use(i18n).use(store).use(vuetify).mount('#app');
