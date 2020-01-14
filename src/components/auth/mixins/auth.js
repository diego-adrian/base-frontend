import axios from 'axios';

export default {
  methods: {
    async getCode () {
      const url = process.env.VUE_APP_BASE_SERVER;
      try {
        const request = {
          method: 'GET',
          url: `${url}/public/codigo`,
          responseType: 'json'
        };
        const response = await axios(request);
        this.$storage.set('oauth2_state', response.data.codigo);
        window.location.href = new URL(response.data.url);
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    },
    reload() {
      this.$store.commit('setMain', false);
      this.$nextTick(() => {
        this.$store.commit('setMain', true);
      });
    },
    cleanData (store) {
      store.commit('setDefault');
    },
    async logout (router) {
      try {
        const url = process.env.VUE_APP_BASE_SERVER;
        const codigo = this.$storage.get('oauth2_state');
        if (codigo) {
          if (this.$storage.existUser()) {
            const request = {
              method: 'POST',
              url: `${url}public/logout`,
              responseType: 'json',
              data: {
                codigo,
                usuario: this.$storage.getUser().usuario
              }
            };
            const response = await axios(request);
            this.cleanData(this.$store);
            window.location.href = new URL(`${response.data.url}`);
          } else {
            const storevuex = this.$store;
            router = router || this.$router;
            this.$storage.removeUser();
            this.$storage.remove('menu');
            this.$storage.remove('token');
            this.$storage.remove('sidenav');
            this.$storage.remove('permissions');
            this.cleanData(storevuex);
            router.push('/login');
          }
        } else {
          const storevuex = this.$store;
          router = router || this.$router;
          this.$storage.removeUser();
          this.$storage.remove('menu');
          this.$storage.remove('token');
          this.$storage.remove('sidenav');
          this.$storage.remove('permissions');
          this.cleanData(storevuex);
          router.push('/login');
        }
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    }
  }
};
