<template>
  <div class="app-login">
    <div class="app-login__background"></div>
    <div class="app-login__primary"></div>
    <div class="app-login__container">
      <v-layout row wrap>
        <v-flex md12 lg12 xs12 sm12 text-center>
          <v-card class="app-login__ciudadaniaDigital"></v-card>
          <v-tooltip bottom color="black" :max-width="320" transition="fade-transition" class="text-justify">
            <template v-slot:activator="{ on }">
              <v-btn width="80%" height="45px" v-on="on" outlined @click="loginOpenid" class="app-login__boton">Ingresar con ciudadanía Digital</v-btn>
            </template>
            <span>Ingresar con Ciudadanía Digital es acercar el Estado a las y los ciudadanos en el mundo digital, para que a través Internet puedan acceder a los servicios de las entidades públicas y garantizar sus derechos en el mundo digital.</span>
          </v-tooltip>
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
