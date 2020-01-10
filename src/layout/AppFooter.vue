<template>
  <v-footer
    fixed
    height="28"
    :inset="inset"
    app
    tile
    v-if="auth"
    padless
    color="transparent"
    class="black--text"
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
@import '../scss/variables.scss';

.theme--light .v-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
}
</style>
