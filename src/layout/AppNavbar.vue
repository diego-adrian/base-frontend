<template>
  <v-app-bar
    app
    :clipped-left="clipped"
    height="58"
    :class="auth ? 'app-navbar white white--text' : 'view--init white--text'"
    :style="auth ? '' : 'box-shadow: none'"
  >
    <v-app-bar-nav-icon v-if="auth" class="btn-mini-variant" @click.stop="$store.commit('layout/toggleMiniVariant')"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="auth" class="btn-drawer" @click.stop="$store.commit('layout/toggleDrawer')"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import Auth from '@/components/auth/mixins/auth';

export default {
  mixins: [Auth],
  data: () => ({
    clipped: false
  }),
  methods: {
  },
  computed: {
    ...mapState(['user']),
    nombreCompleto () {
      const { user } = this.$store.state;

      return user.nombres;
    },
    inicial () {
      const { user } = this.$store.state;
      if (user.usuario) {
        return (user.usuario[0] || '?').toUpperCase();
      }
      return '?';
    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
.view--init {
  background: transparent !important;
  border-bottom: 1px solid rgba($color: $black, $alpha: .25) !important;
}
.app-navbar {
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);

  .v-app-bar__content {
    padding: 0 15px;
  }

  .v-btn .v-icon {
    color: $color;
  }

  .btn-mini-variant {
    display: inline-block;
  }
  .btn-drawer {
    display: none;
  }

}

.btn-fullscreen {
  .v-icon:last-child {
    display: none;
  }
}

body.fullscreen {
  .btn-fullscreen {
    .v-icon:first-child {
      display: none;
    }
    .v-icon:last-child {
      display: inline-block;
    }
  }
}

@media (max-width: 1256px) {
  .app-navbar {
    .btn-mini-variant {
      display: none;
    }
    .btn-drawer {
      display: inline-block;
    }
  }
}
</style>
