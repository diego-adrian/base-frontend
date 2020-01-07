import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#3E2723',
        secondary: '#8D6E63',
        accent: '#82B1FF',
        info: '#2196F3',
        warning: '#FFC107',
        error: '#FF5252',
        success: '#4CAF50'
      },
      dark: {
        primary: '#3E2723',
        secondary: '#8D6E63',
        accent: '#82B1FF',
        info: '#2196F3',
        warning: '#FFC107',
        error: '#FF5252',
        success: '#4CAF50'
      }
    }
  }
});
