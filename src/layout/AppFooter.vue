<template>
  <v-footer
    fixed
    height="28"
    :inset="inset"
    app
    tile
    padless
    color="transparent"
    :class="!auth ? 'white--text' : 'black--text'"
  >
    <div>Desarrollado por AGETIC {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    fixed: false,
    inset: true
  }),
  computed: {
    ...mapState(['auth'])
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.theme--light .v-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
}
</style>
