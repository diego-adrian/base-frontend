<template>
  <v-footer
    fixed
    height="28"
    :inset="inset"
    app
    tile
    padless
    color="rgba(255,255,255,.15)"
    class="white--text"
  >
    <div>Desarrollado por AGETIC {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    fixed: false,
    inset: true
  })
};
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.theme--light .v-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}
</style>
