import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
  options: {
    customProperties: true,
  },
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#002635',
        secondary: '#004B68',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      },
      dark: {
        primary: '#002635',
        secondary: '#004B68',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      }
    }
  }
};

export default new Vuetify(opts);
