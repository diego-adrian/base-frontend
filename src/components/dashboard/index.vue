<template>
  <div>
    Inicio dashboard
    <crud-table/>
  </div>
</template>
<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';

export default {
  data () {
    return {
    };
  },
  mounted () {
    this.$$nextTick(() => {

    });
  },
  components: {
    CrudTable
  }
};
</script>
<style lang="scss" scoped>
</style>
