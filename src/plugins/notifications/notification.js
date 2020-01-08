/* eslint-disable no-new */
import store from '@/store';

export default {
  store,
  install(Vue) {
    const Notification = {
      dialog () {
        const { notifications } = store.state;
        notifications.show = true;
      }
    };

    Vue.prototype.$notifications = Notification.dialog;
  }
};
