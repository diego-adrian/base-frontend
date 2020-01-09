<template>
   <v-navigation-drawer
      app
      permanent
      :clipped="clipped"
      :width="300"
      :mini-variant="$store.state.layout.miniVariant"
      src="../../public/img/sidebar.jpg"
      mini-variant-width="57"
      :expand-on-hover="$store.state.layout.expandOnHover"
      floating
      hide-overlay
      class="app--sidenav"
      :mobile-break-point="600"
    >
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer
          class=app--sidenav__left
          mini-variant
          mini-variant-width="56"
          permanent
          floating
        >
          <v-list-item>
            <v-menu
            offset-y
            offset-x
            :close-on-content-click="false"
            :nudge-width="200"
            :max-width="350"
            origin="left top"
            transition="scale-transition">
              <template v-slot:activator="{ on }">
                <v-list-item-avatar text-center>
                  <v-avatar size="40" color="info" v-on="on" class="app--sidenav__avatar">
                    <span class="white--text headline">{{ appTitle ? appTitle.charAt(0) : '' }}</span>
                  </v-avatar>
                </v-list-item-avatar>
              </template>
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon size="50" color="info">account_circle</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ `${user.nombres} ${user.primer_apellido} ${user.segundo_apellido}` }}</v-list-item-title>
                      <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list>
                  <v-list-item @click="logout">
                    <v-list-item-title class="red--text">
                      <v-icon color="error">folder_shared</v-icon>
                      Cerrar Sesion
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-list-item>
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
                    <span> {{ action.number }} </span>
                  </template>
                  <v-icon
                    medium
                    class="cursor--pointer"
                    color="white"
                    v-on="action.hasOwnProperty('event') ? { click: () => execute(action.event) } : null"
                  >
                    {{ action.icon }}
                  </v-icon>
                </v-badge>
                <!-- SI SON ICONOS SIMPLES -->
                <v-icon
                  v-if="!action.badget"
                  medium
                 :color="action.theme"
                 v-on="action.hasOwnProperty('event') ? { click: () => execute(action.event) } : null"
                >
                  {{ action.icon }}
                </v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-slot:append>
            <div class="pa-2 app--sidenav__drawer">
              <v-app-bar-nav-icon color="white" class="btn-mini-variant" @click.prevent="handleMiniVariant"></v-app-bar-nav-icon>
            </div>
          </template>
          <!-- TERMINA AQUI LA SECCION -->
        </v-navigation-drawer>

        <!-- SECCION MENU PRINCIPAL -->
        <v-list dense class="grow app--sidenav__background">
          <div class="app-logo">
            <h4 class="app-title">
              <span class="white--text text-center">{{ appTitle.toUpperCase() }}</span>
            </h4>
          </div>
          <!-- CARD-IMAGEN PORTADA MENU -->
         <v-card
            flat
            max-width="244"
            :shaped="false"
            :outlined="false"
          >
            <v-img
              aspect-ratio="1.7"
              class="white--text align-end app--sidenav__img"
              height="200px"
              src="../../public/img/geometric.png"
            >
              <v-card-title>
                <div class="initial--name"> {{ user && user.nombres ? user.nombres.charAt(0) : ''}}</div>
                <div>{{ user.nombres }} {{ user.primer_apellido }}</div>
              </v-card-title>
              <v-card-subtitle class="pb-0 white--text email--user">{{ user.email }}</v-card-subtitle>
            </v-img>
          </v-card>
          <!-- FIN DEL CARD -->
          <template v-for="item in menu">
            <!-- SI TIENE SUBMENU -->
            <template v-if="item.submenu">
              <v-list-group
                :key="item.label"
                :value="true"
                color="warning"
                :prepend-icon="item.icon"
                mandatory
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="white--text">{{ item.label }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                  <v-list-item
                    v-for="subItem in item.submenu"
                    :key="subItem.label"
                    link
                    @click="redirect(subItem)"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="white--text" v-text="subItem.label"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
              </v-list-group>
            </template>
            <!-- SI NO TIENE SUBMENU -->
            <template v-else>
              <v-list-item
                :key="item.url"
                color="warning"
                class="cursor--pointer"
                link
                @click="redirect(item)"
              >
                <v-list-item-icon>
                  <v-icon color="warning">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    class="white--text">
                    {{ item.label }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </template>
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
      this.user = this.$storage.getUser();
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
      appTitle: 'Frontend Base',
      user: {},
      actions: [
        {
          title: 'Notificaciones',
          icon: 'notifications',
          theme: 'success',
          number: 15,
          badget: true,
          event: 'getNotifications'
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
      ]
    };
  },
  computed: {
    ...mapState(['menu'])
  },
  methods: {
    redirect (subItem) {
      if (subItem && subItem.hasOwnProperty('url')) {
        if (this.$route.path.replace(/\//gi, '') !== subItem.url) {
          this.$router.push(subItem.url);
        }
      }
    },
    getNotifications () {
      this.$notifications();
    },
    execute (func) {
      this[func]();
    },
    handleMiniVariant () {
      this.$store.commit('layout/toggleMiniVariant');
      this.$store.commit('layout/toggleExpandOnHover');
    },
    fullscreen () {
      this.$util.fullscreen();
    },
    getLabel (item) {
      return item.label;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
  $bgSidenav: rgba($color: darken($primary, 28), $alpha: .75);
  .app--sidenav {
    overflow: hidden !important;
    .app--sidenav__left {
      background-color: darken($color: $primary, $amount: 24) !important;
    }
    .app--sidenav__img {
      background: rgba($color: #ff974f, $alpha: 1);
      border-top: 2px solid $white;
      border-bottom: 1px solid $white;
      .initial--name {
        border: 3px solid $white;
        border-radius: 50%;
        color: $white;
        font-size: 3.4rem;
        height: 100px;
        line-height: 90px;
        margin: 0 auto;
        text-align: center;
        text-transform: uppercase;
        width: 100px;
        & + div {
          font-family: $fontFamilySansation;
          font-size: .9rem;
          letter-spacing: 0;
          font-weight: 600;
        }
      }
      .email--user {
        font-family: $fontFamilySansation;
        font-size: .9rem;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
    .app--sidenav__background {
      background: $bgSidenav !important;
      padding: 0;
      width: 1px;
      .v-list-item {
        .v-list-item__title {
          font-size: 0.8rem;
          font-weight: 400;
        }
      }
      .app-logo {
        height: 49px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgba($color: $white, $alpha: .3);
        .app-title {
          font-size: .9rem;
          font-weight: 400;
        }
      }
    }
    .app--sidenav__drawer {
      .btn-mini-variant {
        display: inline-block;
      }
      .btn-drawer {
        display: none;
      }
    }
    .app--sidenav__avatar {
      cursor: pointer;
    }
  }
</style>
