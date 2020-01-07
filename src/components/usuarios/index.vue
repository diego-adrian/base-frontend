<template>
  <div>
    <crud-table
        :headers="headers"
        :url="url"
        :widthModal="800"
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
            <v-card-title class="headlineModified">
              <v-layout row wrap>
                <v-flex xs10 sm10 md10 lg10 mt-2>
                  <v-icon>{{ form._id ? 'person' : 'person_add' }}</v-icon> {{ form._id ? 'Editar usuario' : 'Adicionar usuario' }}
                </v-flex>
                <v-flex xs2 sm2 md2 lg2 text-md-right text-lg-right text-sm right text-xs-right>
                  <v-tooltip bottom>
                    <v-btn icon color="primary" slot="activator" @click.native="$store.commit('closeModal')">
                      <v-icon color="white">close</v-icon>
                    </v-btn>
                    <span>Cerrar ventana</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </v-card-title>
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
  </div>
</template>
<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';

export default {
  data: () => ({
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
    showFilter: true
  }),
  methods: {
    openModal () {
      console.log('------------------------------------');
      console.log(2222);
      console.log('------------------------------------');
    }
  },
  components: {
    CrudTable
  }
};
</script>
