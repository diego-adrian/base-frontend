<template>
  <div class="crud-table">
    <v-layout row wrap>
      <v-flex xs8 pt-2 pb-3 pl-3>
        <!-- Section buttons -->
        <slot name="buttons"></slot>
        <!-- Section Filters -->
        <div class="btn-filter" :class="{ 'active': showFilter }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                @click.native="filtrar()"
                :id="idFilter"
                class="btn-filter ml-2"
                v-on="on"><v-icon>search</v-icon>
              </v-btn>
            </template>
            <span> Buscar </span>
          </v-tooltip>
        </div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              @click.native="getData()"
              class="btn-refresh ml-2"
              :id="idRefresh"
              v-on="on"><v-icon>refresh</v-icon>
            </v-btn>
          </template>
           <span> Actualizar listado </span>
        </v-tooltip>
        <!-- END Section buttons -->

        <!-- Modal Add/Edit -->
        <v-dialog v-model="modal" persistent :max-width="widthModal">
          <v-card class="crud-dialog">
            <slot name="form">Agregue su formulario aquí</slot>
          </v-card>
        </v-dialog>
        <!-- END Modal Add/Edit -->
      </v-flex>

      <!-- Section Filter -->
      <v-flex xs12 v-if="showFilter">
        <transition name="slide-fade">
          <div class="filter-container">
            <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12>
                <v-text-field
                  @keyup.esc="handleCleanSearch"
                  color="info"
                  outlined
                  autofocus
                  v-model="search"
                  append-icon="search"
                  label="Buscar"
                  hide-details
                ></v-text-field>
              </v-flex>
            </v-layout>
          </div>
        </transition>
      </v-flex>
      <!-- END Section Filter -->
    </v-layout>

    <v-skeleton-loader
      :loading="loading"
      transition="fade-transition"
      type="table"
    >
        <v-data-table
        :headers="getHeaders"
        :items="items"
        :items-per-page="10"
        :loading="loading"
        :search="search"
        @update:page="hola"
        :options.sync="options"
        :server-items-length="totalItems"
        loading-text="Cargando registros..."
        rowsPerPageText="filas por pagina"
        no-results-text="No se encontraron registros que coincidan"
        no-data-text="No hay resultados"
        :mobile-breakpoint="600"
        :footer-props="{
          itemsPerPageOptions: [10, 20, 50],
          itemsPerPageAllText: 'todos',
          itemsPerPageText: 'Filas por página'
        }"
        >
      </v-data-table>
    </v-skeleton-loader>

  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    url: {
      type: String,
      default: process.env.VUE_APP_API_URL
    },
    idRefresh: {
      type: String,
      default: 'btn-refresh-list'
    },
    idFilter: {
      type: String,
      default: 'btn-filter-list'
    },
    order: {
      type: Array,
      default: () => []
    },
    widthModal: {
      type: Number,
      default: 480
    },
    attribute: {
      type: String,
      default: 'listado'
    },
    successList: {
      type: Function,
      default: null
    },
    checkbox: {
      type: Boolean,
      default: false
    },
    checkboxHide: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      showFilter: false,
      search: '',
      totalItems: 0,
      items: [],
      loading: true,
      selected: [],
      options: {
        page: 1,
        itemsPerPage: 10
      }
    };
  },
  mounted () {
    this.$nextTick(() => {
      try {
        this.getData();
      } catch (error) {
        this.$message.error(error.message);
      }
    });
  },
  computed: {
    ...mapState(['modal']),

    getHeaders () {
      const items = [];
      this.headers.map((el) => {
        el.align = 'left';
        items.push(el);
      });
      return items;
    }
  },
  methods: {
    hola (data) {
      console.log('-----------datas-------------------------');
      console.log(data);
      console.log('------------------------------------');
      this.options.page = data;
      this.getData();
    },
    handleItemsPerPageOptions (itemsPerPage) {
      // this.options.itemsPerPage = itemsPerPage;
      console.log('------------------------------------');
      console.log(itemsPerPage);
      console.log('------------------------------------');
    },
    handleChangePagination (page) {
      // this.options.page = page;
      // console.log('------------------------------------');
      // console.log(2222222222222222222);
      // console.log('------------------------------------');
      // this.getData();
      console.log('------------------------------------');
      console.log(page);
      console.log('------------------------------------');
    },
    /**
     * @function handleCleanSearch
     * @description Limpiar el filtro de busqueda presionando la tecla escape
     * @author dbarra@agetic.gob.bo
     */
    handleCleanSearch () {
      this.filtrar();
      this.search = '';
    },
    /**
     * @function getData
     * @description Obtener los registros para el crudTable
     * @author dbarra@agetic.gob.bo
     */
    async getData () {
      try {
        this.loading = true;
        const { page, itemsPerPage } = this.options;

        const query = {
          limit: itemsPerPage,
          page
        };

        const data = await this.$service.list(this.url, query);
        const items = data[this.attribute];
        const { total } = data;

        items.map((el) => {
          if (el.estado !== undefined) {
            el.active = el.estado === 'INACTIVO' ? 'INACTIVE' : 'ACTIVE';
          }
        });
        this.loading = false;
        this.items = items;
        this.totalItems = total;
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    filtrar () {
      this.showFilter = !this.showFilter;
    },
    parseDate (date) {
      if (!date) return null;
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
};
</script>
<style lang="scss">
  @import '../../assets/scss/variables.scss';

  $filterBackground: #f5f5f5;
  $filterBorder: #e5e5e5;

  .crud-table {
    .table-actions {
      white-space: nowrap;
      padding: 0 0 0 5px !important;
      text-align: center;
    }

    td {
      .v-alert {
        padding: 2px 8px;
        text-align: center;
        font-size: 0.9rem;
        font-weight: 600;
        display: inline-block;
      }
    }

    .btn-refresh {
      min-width: 52px;

      .v-btn__content {
        padding: 0;
      }

    }

    .btn-filter {
      display: inline-block;
      position: relative;

      &.active {
        .v-btn {
          background-color: $filterBackground !important;
          box-shadow: none;
        }

        &::after, &::before {
          display: block;
        }
      }

      &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -10px;
        left: 26px;
        border-bottom: 12px solid $filterBorder;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        display: none;
      }

      &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -11px;
        left: 26px;
        border-bottom: 12px solid $filterBackground;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        z-index: 1;
        display: none;
      }
    }

    .filter-container {
      background-color: $filterBackground;
      padding: 10px 15px 20px;
      border: 1px solid $filterBorder;
      position: relative;
      margin: auto;
      width: 98.5%;

      .filter-item {
        display: inline-block;
        width: 200px;
        margin-right: 10px;
        vertical-align: top;
      }

      & > .v-tooltip {
        position: absolute;
        top: -3px;
        right: 0px;
      }

      & > .v-icon {
        display: inline-block;
        margin: 14px 5px 0 0;
      }
    }
  }
</style>
