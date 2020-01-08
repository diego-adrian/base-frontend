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
        primary: '#024f9b',
        secondary: '#046cb3',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      },
      dark: {
        primary: '#024f9b',
        secondary: '#046cb3',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      }
    }
  }
});
