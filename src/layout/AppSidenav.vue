<template>
   <v-navigation-drawer
      :mini-variant="$store.state.layout.miniVariant"
      :clipped="clipped"
      v-model="$store.state.layout.drawer"
      mobile-break-point="600"
      src="../../public/img/sidebar.jpg"
      fixed
      width="260"
      app
      mini-variant-width="70"
      class="app--sidenav"
      :expand-on-hover="$store.state.layout.miniVariant"
    >
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer
          dark
          mini-variant
          mini-variant-width="56"
          permanent
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/75.jpg" class="app--sidenav__imagen" @click="handleClickAvatar"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>
          <!-- SECCION PARA ICONOS COMO SER NOTIFICACIONES, ETC -->
          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="action in actions"
              :key="action.title"
              @click=""
            >
              <v-list-item-action
                class="cursor--pointer"
              >
                <!-- SI SON BADGES -->
                <v-badge
                  v-if="action.badget"
                  :color="action.theme"
                  overlap
                  right
                  class="align-self-center"
                >
                  <template v-slot:badge>
                    <span>2</span>
                  </template>
                  <v-icon
                    medium
                    class="cursor--pointer"
                    color="white"
                  >
                    {{ action.icon }}
                  </v-icon>
                </v-badge>
                <!-- SI SON ICONOS SIMPLES -->
                <v-icon
                  v-if="!action.badget"
                  medium
                 :color="action.theme"
                 v-on="action.hasOwnProperty('event') ? { click: () => this[action.event] }  : null"
                >
                  {{ action.icon }}
                </v-icon>

              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- TERMINA AQUI LA SECCION -->
        </v-navigation-drawer>

        <!-- SECCION MENU PRINCIPAL -->
        <v-list class="grow app--sidenav__background">
          <div class="app-logo">
            <h1 class="app-title">
              <span class="white--text text-md-center text-lg-center">Frontend Base</span>
            </h1>
          </div>
          <v-list-item
            v-for="link in links"
            :key="link"
            link
            class="cursor--pointer"
          >
            <v-list-item-title
              v-text="link"
              class="white--text">
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-row>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import layout from './mixins/layout';
import Auth from '@/components/auth/mixins/auth';

export default {
  mixins: [layout, Auth],
  mounted () {
    if (this.$storage.exist('menu')) {
      this.$store.commit('setMenu', this.$storage.get('menu'));
    }

    if (this.$storage.existUser()) {
      this.$store.commit('setAuth', true);

      if (this.$storage.exist('sidenav')) {
        this.$store.commit('setSidenav', this.$storage.get('sidenav'));
      }

      if (this.$storage.exist('permissions')) {
        this.$store.commit('setPermissions', this.$storage.get('permissions'));
      }
    }

    this.setActive(this.$route.path);
    setTimeout(() => (this.clickEvent(this.$route.path)), 600);
  },
  data () {
    return {
      clipped: false,
      actions: [
        {
          title: 'Notificaciones',
          icon: 'notifications',
          theme: 'success',
          badget: true
        },
        {
          title: 'Reload',
          icon: 'refresh',
          theme: 'white',
          badget: false,
          event: 'reload'
        },
        {
          title: 'fullscreen',
          icon: 'fullscreen',
          theme: 'white',
          badget: false,
          event: 'fullscreen'
        }
      ],
      links: ['Home', 'Contacts', 'Settings'],
      mini: true,
    };
  },
  computed: {
    ...mapState(['menu', 'user'])
  },
  methods: {
    fullscreen () {
      this.$util.fullscreen();
    },
    handleClickAvatar () {
      console.log('------------------------------------');
      console.log('AVATAR');
      console.log('------------------------------------');
    },
    send (url, submenu) {
      if (submenu === undefined) {
        if (this.$storage.exist('menu')) {
          const page = this.$util.getMenuOption(this.$storage.get('menu'), url);
          this.$store.commit('layout/setBreadcrumbs', page);
        }

        this.setActive(url);

        this.$router.push(`/${url || ''}`);
      }
    },
    getLabel (item) {
      // if (item.url) {
      //   let label = this.$t(`menu.${item.url.replace('/', '')}`);
      //   if (label.indexOf('.') === -1) {
      //     return label;
      //   }
      // }

      return item.label;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
  $bgSidenav: rgba($color: $black, $alpha: .75);
  .app--sidenav {
    overflow: hidden !important;
    .app--sidenav__background {
      background: $bgSidenav !important;
      padding: 0;
      .v-list-item {
        .v-list-item__title {
          font-size: 14px;
          font-weight: 600;
        }
      }
      .app-logo {
        height: 57px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba($color: $white, $alpha: .3);
      }
    }
    .app--sidenav__imagen {
      cursor: pointer;
    }
  }
</style>
