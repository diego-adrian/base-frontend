<template>
  <div id="app-waiting" :class="(show) ? 'app-waiting block': 'app-waiting none'" v-if="show">
    <v-progress-circular indeterminate :size="50" color="warning" class="mr-2"></v-progress-circular>
    <span class="app-waiting-message">{{message}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    show: store => store.waiting.show,
    message: store => store.waiting.message
  })
};
</script>

<style lang="scss">
@import '../../scss/variables.scss';
.app-waiting {
  background-color: rgba(darken($primary, 20%), 0.8);
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  justify-content: center;
  align-items: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
  .progress-circular {
    margin: 0 10px 0 0;
  }

  .app-waiting-message {
    color: $white;
    font-size: 1.5rem;
  }
}
.block {
  display: flex !important;
}
</style>
