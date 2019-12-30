import axios from 'axios';

export default {
  methods: {
    async getCode () {
      const url = process.env.VUE_APP_BASE_SERVER;
      try {
        const request = {
          method: 'GET',
          url: `${url}/auth`,
          responseType: 'json'
        };
        const response = await axios(request);
        window.location.href = new URL(response.data.datos.url);
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    }
  }
};
