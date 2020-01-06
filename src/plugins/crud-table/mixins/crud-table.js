export default {
  methods: {
    async editItem (id, url, fields = 'id', form = true) {
      try {
        const response = await this.$service.get(`${url || this.url}/${id}`);
        this.openModal(response, form);
      } catch (error) {
        this.$message.error(error.message);
      }
    },

    deleteItem (id, url) {
      this.$confirm('¿Quiere eliminar el registro?', () => {
        this.$service.delete(url || this.url, id)
          .then(() => {
            this.$message.success('¡Registro eliminado correctamente!');
            this.updateList();
          });
      });
    },

    changeActive(obj, id, url, type, callback, method = 'Edit') {
      const active = obj.active === 'ACTIVE';
      this.$confirm(`¿Está seguro de ${active ? 'activar' : 'desactivar'} el registro?.`, async () => {
        try {
          const response = await (this.$service.patch(`${this.url}/${id}`, {
            transicion: active ? 'activar' : 'inactivar'
          }));
          if (response) {
            if (active) {
              this.$message.success('¡Registro activado!', null, {
                timeout: 2000
              });
            } else {
              this.$message.warning('¡Registro desactivado!', null, {
                timeout: 2000
              });
            }
            this.updateList();
            if (typeof callback === 'function') {
              callback();
            }
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      }, () => (obj.active = active ? 'INACTIVE' : 'ACTIVE'));
    },

    updateList(id = 'btn-refresh-list') {
      if (document.getElementById(id)) {
        document.getElementById(id).dispatchEvent(new window.Event('click'));
      }
    },

    getValue(id, items) {
      id += '';
      for (const i in items) {
        if (items[i].value === id) {
          return items[i];
        }
      }
      return null;
    },

    $update(key, event) {
      this.$store.commit('update', {
        path: [key],
        value: event.target.value
      });
    }
  }
};
