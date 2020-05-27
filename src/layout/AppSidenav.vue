<template>
  <v-card elevation="0">
    <v-navigation-drawer
      color="primary"
      class="app--sidenav"
      :permanent="breakpoints.includes($vuetify.breakpoint.name)"
      :temporary="!breakpoints.includes($vuetify.breakpoint.name)"
      app
      fixed
      style="max-height: 100vh"
      v-model="$store.state.layout.miniVariant"
      :width="isMobile ? '75vw' : 230"
      mini-variant-width="47"
      :expand-on-hover="breakpoints.includes($vuetify.breakpoint.name) ? $store.state.layout.expandOnHover : false"
      :floating="breakpoints.includes($vuetify.breakpoint.name)"
      :stateless="breakpoints.includes($vuetify.breakpoint.name)"
    >
      <v-list-item class="pa-0 ma-0">
        <v-list-item-content class="mb-0 pb-0">
          <v-list-item-title class="title--sidebar pb-2">
            <span>Frontend Base</span>
          </v-list-item-title>
          <v-list-item-subtitle>
          <v-card-title class="container--userinfo">
              <div class="initial--name text-center"> {{ user && user.nombres ? user.nombres.charAt(0) : 'U'}}</div>
              <div>{{ user.nombres }}</div>
              <div class="fs8 mt-2 white--text">{{ user.email ? user.email : 'usuario@demo.com'}}</div>
            </v-card-title>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <template v-for="item in menu">
        <!-- SI TIENE SUBMENU -->
        <template v-if="item.submenu">
          <v-list-group
            :key="item.label"
            :value="true"
            color="primary"
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
            color="primary"
            class="cursor--pointer mt-1 mb-1"
            link
            dense
            @click="redirect(item)"
          >
            <v-list-item-icon class="icon--class">
              <v-icon size="25" style="margin-left: 2px" color="white">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                class="white--text item--title-menu">
                {{ item.label }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import Auth from '@/components/auth/mixins/auth';
import layout from './mixins/layout';

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
      this.roles = this.$storage.get('roles');
    }
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (this.isMobile) {
      this.handleMiniVariant();
    }
    this.setActive(this.$route.path);
    setTimeout(() => (this.clickEvent(this.$route.path)), 600);
  },
  data () {
    return {
      breakpoints: ['md', 'lg', 'xl'],
      user: {},
      roles: [],
      isMobile: null
    };
  },
  computed: {
    ...mapState(['menu'])
  },
  methods: {
    exit () {
      this.$confirm('¿Está seguro de salir del sistema?', () => {
        this.logout();
      }, null);
    },
    gotoProfile () {
      this.$router.push('/profile');
    },
    redirect (subItem) {
      if (subItem.url === 'logout') {
        this.$confirm('¿Está seguro de cerrar la sesión?', () => {
          this.logout();
        });
        return;
      }
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
@import '../scss/variables.scss';
  .app--sidenav {
    .title--sidebar {
      font-size: 15px;
      color: $white;
      text-align: center;
      user-select: none;
    }
    .container--userinfo {
      flex-direction: column;
      background: url('../../public/img/geometric.png') no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
      .initial--name {
        border: 3px solid $warning;
        border-radius: 50%;
        color: $secondary;
        font-size: 3.4rem;
        height: 100px;
        line-height: 90px;
        margin: 0 auto;
        text-align: center;
        text-transform: uppercase;
        background: $white;
        width: 100px;
        & + div {
          font-family: $fontFamilyTitilliumWeb;
          font-size: .9rem;
          letter-spacing: 0;
          font-weight: 600;
        }
      }
    }
    .email--user {
      text-align: center;
      font-family: $fontFamilyTitilliumWeb;
      letter-spacing: 0;
      font-size: 15px;
      font-weight: 300;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 90%;
      margin: auto;
    }
    .item--title-menu {
      font-size: 13px;
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
    .pointer--none {
      span {
        pointer-events: none;
      }
    }
  }
  .card-rol {
    max-width: 180px;
    cursor: pointer
  }
  .icon--class {
    margin-right: 5px !important;
  }
</style>
