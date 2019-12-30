<template>
  <div class="app-login">
    <div class="app-login__background"></div>
    <div class="app-login__container">
      <v-layout row wrap>
        <v-flex md12 lg12 xs12 sm12>
          <v-card class="app-login__ciudadaniaDigital"></v-card>
          <v-btn color="primary" @click="loginOpenid" class="app-login__boton">Ingresar con ciudadanía Digital</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Auth from './mixins/auth';

export default {
  mixins: [Auth],
  data () {
    return {};
  },
  methods: {
    loginOpenid () {
      this.getCode();
    }
  }
};
</script>

<style lang="scss" src="./Login.scss"></style>
