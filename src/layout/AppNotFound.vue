<template>
  <div class="not-found">
    <div class="not-found__message text-center">
      <h1>
        <span class="primary--text">4</span>0<span class="primary--text">4</span>
      </h1>
      <h4>Ups !!! no logramos encontrar la página que buscabas</h4>
      <v-btn color="primary" @click="$router.go(-1)"><v-icon dark>arrow_back</v-icon> Volver atrás</v-btn>
    </div>
  </div>
</template>

<style lang="scss">

@import '../scss/variables.scss';
.not-found {
  background: url('../../public/img/sidebar.jpg') no-repeat;
  background-size: cover;
  background-position: top center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .not-found__message {
    box-shadow: 0 1px 4px 0 rgba($color: $black, $alpha: .1);
    padding: 30px;
    background-color: rgba($white, 0.8);
    width: 100%;
    max-width: 680px;

    h1 {
      font-weight: bold;
      font-size: 11rem;
      margin-top: 0;
      letter-spacing: 2px;
    }
    h4 {
      font-size: 1.3rem;
      font-weight: 300;
    }
  }

  .error-500 {
    background-color: darken($secondary, 33%);
    color: #fafafa;
    padding: 18px 20px;
    font-family: Courier;
    margin-bottom: 20px;
    font-size: 12px;
    text-align: left;
  }
}

</style>
