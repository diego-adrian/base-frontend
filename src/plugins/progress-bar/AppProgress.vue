<template>
   <v-progress-linear
      class="app--progress"
      :active="active"
      :background-opacity="0.3"
      fixed
      :buffer-value="100"
      :height="4"
      :query="query"
      top
      :value="value"
      color="info"
    ></v-progress-linear>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    bottom: false,
    query: true,
    value: 0
  }),
  mounted () {
    this.queryAndIndeterminate();
  },
  computed: mapState({
    active: store => store.progress.active
  }),
  methods: {
    queryAndIndeterminate () {
      this.value = 20;
      setTimeout(() => {
        this.query = false;
        this.interval = setInterval(() => {
          if (this.value === 100) {
            clearInterval(this.interval);
          }
          this.value += 10;
        }, 150);
      }, 300);
    },
  }
};
</script>
<style lang="scss" scoped>
  .app--progress {
    z-index: 1000;
  }
</style>
