<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xs="12"
      >
        <v-alert
          text
          type="info"
        >
          Modal para confirmaciones o alertas
        </v-alert>
      </v-col>
      <v-col
        cols="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xs="12"
        class="mt-2 mb-2"
      >
        <v-btn color="warning" @click.stop="showConfirmation">Confirmación</v-btn>
        <v-btn class="ml-2" color="info" @click.stop="showAlert">Alert</v-btn>
      </v-col>
      <v-col
        cols="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xs="12"
        class="mt-2 mb-2"
      >
        <v-alert
          border="left"
          type="success"
          text
        >
          Para mejorar la espera de datos, por ejemplo en el crud-table se esta utilizando skeleton loaders <br>
          <strong><small>En este ejemplo estamos viendo que esta esperando a que se carguen articulos, imagenes, y acciones</small></strong>
        </v-alert>
      </v-col>
      <v-col
        cols="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xs="12"
      >
        <v-sheet
          color="transparent"
          class="px-3 pt-3 pb-3"
        >
          <v-skeleton-loader
            class="mx-auto"
            type="article, image, table-tfoot"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xs="12"
        class="mt-2 mb-2"
      >
        <v-alert
          type="error"
          text
          outlined
        >
          Pantallas bloqueantes
        </v-alert>
      </v-col>
      <v-col
        cols="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xs="12"
      >
        <v-btn color="error" outlined text @click.stop="showBlock">Bloquear pantalla</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
    };
  },
  methods: {
    showConfirmation () {
      this.$confirm('Modal demo para mostrar la confirmacion', () => {
        this.$message.success('Presionaste aceptar');
      }, () => {
        this.$message.warning('Presionaste cancelar');
      });
    },
    showAlert () {
      this.$alert('Modal demo para mostrar un alert');
    },
    showBlock () {
      this.$waiting(true, 'Modal demo para mostrar una pantalla bloqueante que se eliminar dentro de 5 segundos');
      setTimeout(() => {
        this.$waiting(false);
      }, 5000);
    }
  },
  mounted () {
    this.$nextTick(() => {
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
