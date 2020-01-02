import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// Plugins
import Message from '@/plugins/message/message';
import Storage from '@/plugins/storage';
import Service from '@/plugins/service';
import Util from '@/plugins/util';

import './assets/scss/index.scss';

Vue.use(Message);
Vue.use(Storage);
Vue.use(Util);
Vue.use(Service, {
  apiUrl: process.env.VUE_APP_API_URL,
  baseServer: process.env.VUE_APP_BASE_SERVER,
  authToken: process.env.VUE_APP_AUTH_TOKEN,
  filterResponse: (response, Message) => {
    if (response.datos && response.finalizado) {
      return response.datos;
    }
    if ('finalizado' in response && !response.finalizado) {
      Message.error(response.message);
      return response.datos;
    }
    return response;
  },
  errorFormat: 'mensaje'
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
