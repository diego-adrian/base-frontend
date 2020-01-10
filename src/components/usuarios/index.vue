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
                <v-icon>{{ form._id ? 'person' : 'person_add' }}</v-icon>
                {{ form._id ? 'Editar usuario' : 'Adicionar usuario' }}
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
                <v-text-field
                  label="Usuario"
                ></v-text-field>
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
                  required
                  label="Usuario"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
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

export default {
  data: () => ({
    rules: {
      user: [
        val => (val || '').length > 0 || 'El campo usuario no puede estar vacio',
        val => (val || '').length > 10 || 'El campo usuario no puede tener menos de 10 caracteres'
      ]
    },
    form: {
      user: '',
      password: '',
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      ci: '',
      tipo_documento: '',
      fecha_nacimiento: '',
      email: '',
      telefono: '',
      institucion: '',
      roles: ''
    },
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
      const { lg, sm, xs } = this.$vuetify.breakpoint;
      console.log('------------------------------------');
      console.log(lg, sm, xs);
      console.log('------------------------------------');
      // this.$refs.form.reset();
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
    }
  },
  components: {
    CrudTable
  }
};
</script>
