<template>
  <section class="snackbar__container">
    <v-snackbar
      v-for="(t, idx) in items"
      :key="t.key"
      :color="'success'"
      :style="`top: ${t.top}px`"
      v-model="snackbar[idx]"
      :timeout="timeout"
      top
    >
      <v-icon>{{ t.icon }}</v-icon>
      {{ t.message }}
      <v-btn icon dark @click.native="remove(t.key)">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </section>
</template>

<script>
export default {
  props: {
    timeout: {
      type: Number,
      default: 6000
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
      const item = {
        message, title, icon, theme, key: `${Date.now()}-${Math.random()}`, top: (this.items.length * 60) + 10
      };
      this.items.push(item);
      this.snackbar.push(true);
      setTimeout(() => {
        this.remove(item.key);
      }, this.timeout);
    },
    remove (key) {
      const index = this.items.findIndex(item => item.key === key);
      this.snackbar[index] = false;
      this.snackbar.splice(index, 1);
      this.items.splice(index, 1);
    }
  },
  data () {
    return {
      snackbar: [],
      items: []
    };
  }
};
</script>
