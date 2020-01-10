<template>
  <crud-table
    :headers="headers"
    :url="url"
    :filters="filters"
    :widthModal="600"
    :order="order"
    >

      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
              @click.native.stop="openModal()"
              slot="activator"
            ><v-icon dark>person_add</v-icon> Agregar </v-btn>
          </template>
          <span> Agregar usuario </span>
        </v-tooltip>
      </template>

      <template slot="form" slot-scope="">
        <v-card-title class="ma-0 pa-1">
          <v-container fluid>
            <v-row no-gutters>
              <v-col
                align="start"
                justify="center"
                :cols="11">
                <v-icon>{{ form.id ? 'person' : 'person_add' }}</v-icon>
                {{ form.id ? 'Editar usuario' : 'Adicionar usuario' }}
              </v-col>
              <v-col :cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="gray" v-on="on" @click.native="$store.commit('closeModal')">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </template>
                  <span>Cerrar ventana</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <!-- FORMULARIO PARA AGREGAR O EDITAR -->
        <v-form
          ref="form"
          v-model="valid"
        >
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                :md="6"
                :xs="12"
                :sm="12"
              >
                <v-text-field
                  color="success"
                  clearable
                  required
                  :rules="rules.user"
                  v-model="form.usuario"
                  prepend-icon="account_circle"
                  label="Usuario"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                :md="6"
                :xs="12"
                :sm="12"
              >
                <v-autocomplete
                  color="success"
                  label="Cargo"
                  no-data-text="No existen registros"
                  :items="items"
                  required
                  v-model="form.cargo"
                  :rules="rules.cargo"
                  item-text="label"
                  return-object
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                :md="12"
                :xs="12"
                :sm="12"
              >
                <v-text-field
                  color="primary"
                  required
                  label="Correo Electrónico"
                  v-model="form.email"
                  :rules="rules.email"
                  placeholder="Escriba su correo electrónico"
                ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-container fluid>
                <v-row>
                  <v-col
                    justify="start"
                    :xs="12"
                    :sm="12"
                    :md="6"
                    :lg="6"
                    cols="12">
                      <small class="error--text text-required">* Los campos son obligatorios</small>
                  </v-col>
                  <v-col
                    align="right"
                    :sm="12"
                    :xs="12"
                    :md="3"
                    :lg="3"
                    cols="12"
                  >
                    <v-btn block @click.native="$store.commit('closeModal');"><v-icon>cancel</v-icon> Cancelar </v-btn>
                  </v-col>
                  <v-col
                    align="right"
                    :sm="12"
                    :xs="12"
                    :md="3"
                    :lg="3"
                    cols="12"
                  >
                    <v-btn block color="primary" type="submit" :disabled="!valid">
                      <v-icon dark>check</v-icon> Enviar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>

            </v-card-actions>
          </v-card>
        </v-form>
      </template>

      <template slot="items" slot-scope="items">
        <td>
          <v-tooltip bottom>
            <v-btn icon slot="activator" @click="editItem(items.item._id)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <span>Editar registro</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn icon slot="activator" @click="deleteItem(items.item._id)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
            <span>Eliminar registro</span>
          </v-tooltip>
        </td>
        <td>
          <v-tooltip bottom>
            <v-switch
              :input-value="items.item.activo"
              value
              @change="changeVisible('usuarios/', items.item, items.item._id)"
              slot="activator"
              color="success"></v-switch>
            <span>Activar/desactivar registro</span>
          </v-tooltip>
        </td>
        <td>{{ items.item.user }}</td>
        <td>{{ items.item.primer_apellido }} {{ items.item.segundo_apellido }} {{ items.item.nombres }}</td>
        <td>{{ items.item.email }}</td>
        <td>{{ items.item.roles.titulo }}</td>
        <td>{{ $datetime.format(items.item.createAt, 'dd/MM/YYYY') }}</td>
        <td>
          <v-chip label color="success" text-color="white" v-if="items.item.activo == true">
            ACTIVO
          </v-chip>
          <v-chip label color="warning" text-color="white" v-if="items.item.activo == false">
            INACTIVO
          </v-chip>
        </td>
      </template>

    </crud-table>
  </template>
<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    valid: false,
    rules: {
      user: [
        val => (val || '').length > 0 || 'El campo usuario no puede estar vacio',
        val => (val || '').length > 10 || 'El campo usuario no puede tener menos de 10 caracteres'
      ],
      cargo: [
        (val) => {
          const isValid = val ? Object.keys(val) : '';
          return isValid.includes('key') || 'El campo cargo no puede estar vacio';
        }
      ],
      email: [
        val => (val || '').length > 0 || 'El campo email no puede estar vacio',
        val => /\S+@\S+\.\S+/.test(val) || 'El campo email no es válido'
      ]
    },
    items: [
      { key: 'Profesional', label: 'Profesional' },
      { key: 'Tecnico', label: 'Técnico' },
      { key: 'Director', label: 'Director' }
    ],
    url: 'user',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: true, sortable: false },
      { text: 'Activado', divider: false, sortable: false },
      { text: 'Usuario', align: 'center', value: 'usuario' },
      { text: 'Cargo', value: 'cargo' },
      { text: 'Correo Electronico', value: 'email' },
      { text: 'Fecha de creacion', value: '_created_at' },
      { text: 'Estado', sortable: false, value: 'estado' }
    ],
    form: {
      id: null,
      usuario: null,
      cargo: null,
      email: null
    },
    filters: [
      {
        field: 'usuario',
        label: 'Usuario',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'cargo',
        label: 'Nombre completo',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'email',
        label: 'Email',
        type: 'text',
        typeG: 'String'
      }
    ]
  }),
  methods: {
    openModal () {
      // if (data._id) {
      //   this.$nextTick(() => {
      //     this.form = data;
      //     this.form.roles = this.getValue(this.form.roles, this.roles);
      //     this.form.institucion = this.getValue(this.form.institucion, this.instituciones);
      //   });
      // } else {
      //   this.form = {
      //     user: '',
      //     password: '',
      //     nombres: '',
      //     primer_apellido: '',
      //     segundo_apellido: '',
      //     email: '',
      //     telefono: '',
      //     institucion: '',
      //     roles: '',
      //     tipo_documento: '',
      //     ci: '',
      //     fecha_nacimiento: null
      //   };
      // }
      this.$store.commit('openModal');
    },
    /**
     * @function save
     * @description Esta funcion esta creada para guardar en la BD
     * @author dbarra@agetic.gob.bo
     */
    async save () {
      if (this.$refs.form.validate()) {
        const data = Object.assign({}, this.form);
        if (data.id) {
          const response = await this.$service.put(`usuarios/${data.id}`, data);
          if (response) {
            this.$store.commit('closeModal');
            this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          this.updateList();
          // this.$service.post('usuarios', data).then((response) => {
          //   if (response) {
          //     this.$store.commit('closeModal');
          //     this.updateList();
          //     this.$message.success('El registro fue agregado correctamente');
          //   }
          // });
        }
      }
    }
  },
  components: {
    CrudTable
  }
};
</script>
