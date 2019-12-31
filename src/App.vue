<template>
  <v-app :class="{ 'app-login': !auth }">
    <app-sidenav v-if="auth"></app-sidenav>
    <app-navbar></app-navbar>
    <v-content v-if="main">
      <!-- <app-breadcrumbs v-if="auth"></app-breadcrumbs> -->
      <div class="main">
        <transition :name="transitionName" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import AppSidenav from '@/layout/AppSidenav.vue';
import AppNavbar from '@/layout/AppNavbar.vue';
import AppFooter from '@/layout/AppFooter.vue';
import Auth from '@/components/auth/mixins/auth';

// Páginas que no necesitan autenticación/token/sesión
const PageNoLogin = ['login'];

export default {
  name: 'App',
  mixins: [Auth],
  mounted () {
    Notification.requestPermission();
  },
  components: {
    AppSidenav,
    AppNavbar,
    AppFooter
  },
  created () {
    const error = this.$storage.get('error');
    if (error) {
      this.$message.error(error);
      this.$storage.remove('error');
    }
    if (this.$storage.existUser()) {
      this.$store.commit('setAuth', true);

      if (this.$storage.exist('sidenav')) {
        this.$store.commit('setSidenav', this.$storage.get('sidenav'));
      }

      if (this.$storage.exist('permissions')) {
        this.$store.commit('setPermissions', this.$storage.get('permissions'));
      }

      // this.timerSession();
    } else if (PageNoLogin.indexOf(this.$route.path.substring(1)) === -1 || this.$route.path === '/') {
      // this.logout();
    }
  },
  data () {
    return {
      transitionName: ''
    };
  },
  computed: {
    ...mapState(['auth', 'sidenav', 'main'])
  },
  methods: {},
  watch: {
    '$route' (to, from) {
      if (!this.$storage.existUser() && PageNoLogin.indexOf(to.path.substring(1)) === -1) {
        // this.logout();
      }
      if (to.path !== '/login' && from.path !== '/login') {
        this.transitionName = 'fade';
      } else {
        this.transitionName = '';
      }
      if (to.path === '/login' && this.$storage.existUser()) {
        this.$router.push('dashboard');
      }
    }
  }
};
</script>

<style lang="scss">
</style>
