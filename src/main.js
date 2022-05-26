import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import quasarUserOptions from './quasar-user-options';
import router from './router';

createApp(App).use(router).use(Quasar, quasarUserOptions).mount('#app');
