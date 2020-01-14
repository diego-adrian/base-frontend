<template>
  <section class="snackbar__container">
    <v-snackbar
      :class="`snackbar--${item.theme}`"
      v-model="snackbar"
      :timeout="timeout"
      :multi-line="false"
      top
      right
    >
      <v-container fluid class="snackbar--row">
        <v-row no-gutters>
          <v-col cols="2" class="snackbar--icon">
            <v-icon color="warning">information</v-icon>
          </v-col>
          <v-col cols="10" class="text-left">
            {{ item.message }}
          </v-col>
        </v-row>
      </v-container>
      <v-btn dark icon @click.native.prevent="remove">
        <v-icon color="white">close</v-icon>
      </v-btn>
    </v-snackbar>
  </section>
</template>

<script>
export default {
  props: {
    timeout: {
      type: Number,
      default: 5000
    }
  },
  methods: {
    success (message, title, option = {}) {
      this.add(message || 'La operación se realizó correctamente.', title || 'Correcto', 'check', { theme: 'success', timeout: option.timeout });
    },
    info (message, title, option = {}) {
      this.add(message || 'Revise la documentación.', title || 'Información', 'info', { theme: 'info', timeout: option.timeout });
    },
    warning (message, title, option = {}) {
      this.add(message || 'Ocurrió algo inesperado al procesar su operación.', title || 'Advertencia', 'warning', { theme: 'warning', timeout: option.timeout });
    },
    error (message, title, option = {}) {
      this.add(message || 'Ocurrió un error al procesar su operación.', title || 'Error', 'error', { theme: 'error', timeout: option.timeout });
    },
    add (message, title, icon, { theme }) {
      if (!this.$parent) {
        this.$mount();
        document.body.appendChild(this.$el);
      }
      this.snackbar = true;
      this.item = {
        message, title, icon, theme
      };
    },
    remove () {
      this.snackbar = false;
    }
  },
  data () {
    return {
      snackbar: false,
      item: {}
    };
  }
};
</script>
<style lang="scss">
  @import '../../scss/variables.scss';
  .snackbar--row {
    padding: 0 !important
  }
  .snackbar--icon {
    display: inline-flex;
    color: $white !important;
    i {
      padding-left: 10px;
      color: $white !important;
    }
  }
  .snackbar--success {
    .v-snack__wrapper {
      border-radius: 7px;
      .v-snack__content {
        border-radius: 7px;
        background: $success;
        font-size: .8rem;
        max-width: 400px;
      }
    }
  }
  .snackbar--info {
    .v-snack__wrapper {
      border-radius: 7px;
      .v-snack__content {
        border-radius: 7px;
        background: $info;
        font-size: .8rem;
        max-width: 400px;
      }
    }
  }
  .snackbar--error {
    .v-snack__wrapper {
      border-radius: 7px;
      .v-snack__content {
        border-radius: 7px;
        background: $error;
        font-size: .8rem;
        max-width: 400px;
      }
    }
  }
  .snackbar--warning {
    .v-snack__wrapper {
      border-radius: 7px;
      .v-snack__content {
        border-radius: 7px;
        background: $warning;
        font-size: .8rem;
        max-width: 400px;
      }
    }
  }
</style>
