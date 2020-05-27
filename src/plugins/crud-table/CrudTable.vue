<template>
  <div class="crud-table">
    <v-row no-gutters class="mt-2 mb-2">
      <v-col cols="12" class="d-flex flex-row align-center justify-start">
        <slot name="extra-row"></slot>
      </v-col>
      <slot name="customFilters"></slot>
      <v-col cols="12" class="d-flex flex-row align-center justify-start">
        <!-- Section buttons -->
        <slot name="buttons"></slot>
        <!-- Section Filters -->
        <div class="btn-filter" :class="{ 'active': showFilter }" v-if="filters.length > 0">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                @click.native="filtrar()"
                :id="idFilter"
                text
                class="btn-filter"
                v-on="on"><v-icon color="primary">search</v-icon>
              </v-btn>
            </template>
            <span> Buscar </span>
          </v-tooltip>
        </div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              @click.native="getData(true)"
              :class="`btn-refresh ${idRefresh}`"
              v-on="on"><v-icon color="primary">refresh</v-icon>
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
      </v-col>

      <!-- Section Filter -->
      <v-col cols="12" lg="12" md="12" sm="12" class="mt-3" v-if="showFilter && filters.length > 0">
        <transition name="slide-fade">
          <v-container fluid class="container--filter">
            <v-row
              no-gutters
              style="width: 97%"
            >
              <v-col
                :cols="12"
                :class="[!['sm', 'xs'].includes($vuetify.breakpoint.name) ? 'd-flex flex-row align-center justify-around': '']"
              >
                <template
                  v-for="(filter, idx) in filters"
                >
                  <v-text-field
                    :key="filter.field"
                    dense
                    outlined
                    ref="searchTextField"
                    class="ml-2 mr-2 mb-1"
                    :autofocus="idx === 0"
                    v-if="filter.type == 'text'"
                    v-model="search[filter.field]"
                    :label="filter.label"
                    hide-details
                  ></v-text-field>
                </template>
              </v-col>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click.native="handleCleanFilters()" v-on="on"
                    color="gray"
                    dark
                    small
                    absolute
                    right
                    fab
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar filtro/búsqueda</span>
              </v-tooltip>

            </v-row>
          </v-container>
        </transition>
      </v-col>
      <!-- END Section Filter -->
    </v-row>

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
      @update:page="requestData"
      @update:items-per-page="handleItemsPerPageOptions"
      :options.sync="options"
      class="data--table"
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
        <!-- ACTIONS -->
        <template v-slot:item.ACTIONS="{ item }" v-if="!custom">
          <slot name="actions" :props="item"></slot>
        </template>
        <!-- ALL ITEMS -->
        <template v-slot:item="{item}" v-if="custom">
          <slot name="items" :items="item"></slot>
        </template>
        <!-- BUTTONS FOOTER -->
        <template v-slot:top>
          <div>
            <v-select
              label="Ir a la página"
              outlined
              dense
              hide-details
              color="primary"
              v-model="pageNumber"
              :items="numbers"
              class="input--search_page"
              @change="goToPage"
            >
            </v-select>
          </div>
        </template>
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
    custom: {
      type: Boolean,
      default: false
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
    filters: {
      type: Array,
      default: () => []
    },
    widthModal: {
      type: Number,
      default: 480
    },
    attribute: {
      type: String,
      default: 'rows'
    }
  },
  watch: {
    'options.sortDesc' (ant, value) {
      if (ant !== value && this.loaded) {
        this.getData();
      }
    },
    activeSearch: {
      handler (value) {
        if (value) {
          this.getData();
          this.activeSearch = false;
        }
      },
      deep: true
    }
  },
  data () {
    return {
      showFilter: false,
      search: {},
      activeSearch: false,
      totalItems: 0,
      items: [],
      loading: true,
      pageNumber: null,
      loaded: false,
      itemsPerPage: null,
      selected: [],
      numbers: [],
      options: {
        page: 1,
        itemsPerPage: 10
      },
      showFilterActive: this.showFilter
    };
  },
  destroyed () {
    this.loaded = false;
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
    goToPage () {
      this.options.page = this.pageNumber;
      this.getData();
    },
    requestData (data) {
      this.options.page = data;
      this.pageNumber = data;
      this.getData();
    },
    /**
        * @function addEventKeydown
        * @description Esta funcion esta implementada nativamente, porque vue no reconoce el keydown solo el jekup
        * @link  https://vuejs.org/v2/guide/events.html
        * @param name index
      */
    addEventKeydown (elem) {
      const element = elem;
      let typingTimer;
      const doneTypingInterval = 1000;
      if (element) {
        element.onkeydown = () => {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(async () => {
            this.activeSearch = true;
          }, doneTypingInterval);
          return true;
        };
      }
    },
    handleItemsPerPageOptions (itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
      this.getData();
    },
    /**
     * @function handleCleanFilters
     * @description Limpiar los filtros
     * @author dbarra@agetic.gob.bo
     */
    handleCleanFilters () {
      this.search = {};
      this.getData();
      this.showFilter = false;
    },
    /**
     * @function getData
     * @description Obtener los registros para el crudTable
     * @author dbarra@agetic.gob.bo
     */
    async getData (refresh = false) {
      try {
        this.loading = true;
        if (this.itemsPerPage) {
          this.options.itemsPerPage = this.itemsPerPage;
        }
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;
        let query = {
          limit: itemsPerPage,
          page
        };
        const sort = Array.isArray(sortBy) && sortBy.length > 0 ? sortBy[0] : sortBy;
        const desc = Array.isArray(sortDesc) && sortDesc.length > 0 ? sortDesc[0] : sortDesc;
        if ((sort || '').length > 0 && !refresh) {
          query.order = (desc ? '-' : '') + sort;
        }
        if (Object.keys(this.search).length) {
          for (const key in this.search) {
            if (this.search[key] !== '') {
              query[key] = this.search[key];
            }
          }
        }
        if (Object.keys(query).length > 2) {
          query = {
            ...query,
            page: 1
          };
          this.options.page = 1;
        }
        let data = await this.$service.list(this.url, query);
        if (data.datos) {
          data = data.datos;
          const items = data[this.attribute];
          const n = parseInt(data.count / this.options.itemsPerPage);
          const isHigher = n * this.options.itemsPerPage >= data.count;
          this.numbers = [...Array(n > 0 ? isHigher ? n : n + 1 : 1).keys()].map(item => item + 1);
          const { count } = data;
          items.map((el) => {
            if (el.estado !== undefined) {
              el.active = el.estado === 'INACTIVO' ? 'INACTIVE' : 'ACTIVE';
            }
          });
          this.setPropsDataTable(false, items, count);
        } else {
          this.setPropsDataTable();
        }
        setTimeout(() => {
          this.loaded = true;
        }, 1000);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    setPropsDataTable (loading = false, items = [], count = 0) {
      this.loading = loading;
      this.items = items;
      this.totalItems = count;
    },
    filtrar () {
      this.showFilter = !this.showFilter;
      if (this.showFilter) {
        for (const key in this.search) {
          this.search[key] = '';
        }
        setTimeout(() => {
          for (const elem of this.$refs.searchTextField) {
            this.addEventKeydown(elem.$el);
          }
        }, 300);
      }
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
  @import '../../scss/variables.scss';

  $filterBackground: #f5f5f5;
  $filterBorder: #e5e5e5;
  .data--table {
    display: flex;
    flex-direction: column;
    & > div {
      &:nth-child(1) {
        order: 3;
        margin-top: -50px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        z-index: 1;
        width: 30vw;
        max-width: 30vw;
      }
      &:nth-child(2) {
        order: 1;
      }
      &:nth-child(3) {
        order: 2;
      }
    }
    .input--search_page {
      max-width: 120px;
      width: 120px;
    }
  }
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
    .container--filter {
      background: $filterBackground;
      border: 1px solid $filterBorder;
    }
  }
</style>
