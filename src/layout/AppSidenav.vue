<template>
   <v-navigation-drawer
      :mini-variant="$store.state.layout.miniVariant"
      :clipped="clipped"
      v-model="$store.state.layout.drawer"
      mobile-break-point="600"
      src="../../public/sidebar.jpg"
      fixed
      width="260"
      app
      mini-variant-width="70"
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
              <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
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
              <v-list-item-action>
                <v-badge
                  color="success"
                  overlap
                  right
                  class="align-self-center"
                >
                  <template v-slot:badge>
                    <span>!</span>
                  </template>
                  <v-icon
                    medium
                    color="grey"
                  >
                    {{ action.icon }}
                  </v-icon>
                </v-badge>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ action.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- TERMINA AQUI LA SECCION -->
        </v-navigation-drawer>

        <v-list class="grow">
          <v-list-item
            v-for="link in links"
            :key="link"
            link
          >
            <v-list-item-title v-text="link"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-row>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';
import layout from './mixins/layout';

export default {
  mixins: [layout],
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
  data: () => ({
    clipped: false,
    actions: [
      { title: 'Home', icon: 'dashboard' },
      { title: 'About', icon: 'question_answer' },
    ],
    links: ['Home', 'Contacts', 'Settings'],
    mini: true,
  }),
  computed: {
    ...mapState(['menu', 'user'])
  },
  methods: {
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

$bgSidenav: rgba($color: $black, $alpha: .65);

.theme--light .app-sidenav {
  background-color: $bgSidenav !important;

  .v-list {
    background-color: $bgSidenav;
    padding: 0;
  }

  .v-list .v-list__tile--link.active {
    background-color: rgba(0,0,0,0.12);
  }

  .v-list__group__items--no-action .v-list__tile {
    padding-left: 60px;
  }

  .v-list__group__header__prepend-icon {
    padding: 0 4px 0 16px;

    & + div > .v-list__tile {
      padding-left: 4px;
    }
  }

  .v-list__tile.primary--text, .v-list__group,
  .sidenav-one .v-list__tile__content {
    color: lighten($primary, 40%);

    .v-icon {
      color: lighten($warning, 6%);
    }

    .v-list__tile__title {
      font-size: 16px;
    }
  }

  .sidenav-one {
    .v-list__tile__action {
      min-width: 44px;
    }
    .v-list__tile__content {

    }
  }

  .app-logo {
    background-color: darken($bgSidenav, 2%);
    height: 70px;

    .v-icon {
      font-size: 36px;
      margin: -5px 5px 0 0;
    }

    .app-title {
      color: white;
      font-weight: 300;
      line-height: 66px;
      font-size: 24px;
      padding: 0 15px;
      white-space: nowrap;
    }
  }

  &.v-navigation-drawer--mini-variant {
    overflow: initial;

    .app-title {
      span {
        display: none;
      }
    }

    .sidenav-one:hover {
      width: 280px;
      background-color: $primary;

      .v-list__tile__action {
        margin-right: 30px;
      }
    }

    .v-list__tile__content {
      opacity: 1;
    }

    .v-list__group__items--no-action .v-list__tile {
      padding-left: 20px;
      padding-right: 20px;
    }

    .sidenav-parent {
      background-color: $primary;
      position: relative;

      &:hover {
        .v-list__group__header {
          background-color: $primary;
          width: 280px;

          .v-list__tile--link {
            display: block;
          }
        }

        .v-list__group__items {
          border-top: 2px solid darken($primary, 10%);
          background-color: $primary;
          display: block !important;
          position: absolute;
          z-index: 5;
          top: 60px;
          left: 70px;
          border-radius: 0 0 3px 3px;
          width: 210px;
        }
      }
    }

    .v-list {
      .sidenav-one .v-list__tile--link {
        padding: 10px 20px 10px 9px;
        height: 60px;

        .v-list__tile__action {
        }
      }
    }

    .v-list__group__header {
      .v-list__group__header__prepend-icon {
        padding: 16px 4px 16px 20px;
        width: 68px;

        .v-icon {
          font-size: 2rem;
        }
      }

      .v-list__tile--link {
        display: none;
      }

      .v-list__group__header__append-icon {
        display: none;
      }
    }

    .v-list__group__items {
      display: none !important;
    }
  }

}
</style>
