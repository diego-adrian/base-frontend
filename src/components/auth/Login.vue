<template>
  <div class="app-login">
    <div class="app-login__background"></div>
    <div class="app-login__container">
      <v-container fluid>
        <v-row no-gutters>
          <v-col
            justify="center"
            align="center"
            cols="12"
            sm="12"
            xs="12"
            md="12"
            lg="12"
            xl="12"
          >
            <v-card elevation="0" class="app-login__ciudadaniaDigital"></v-card>
            <v-btn outlined @click="loginOpenid" class="app-login__boton">Ingresar con ciudadanía Digital</v-btn>
          </v-col>
        </v-row>
      </v-container>
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
    /**
     * @function loginOpenid
     * @description Conectar con OpenID
     */
    loginOpenid () {
      this.getCode();
    }
  }
};
</script>

<style lang="scss" src="./Login.scss"></style>
