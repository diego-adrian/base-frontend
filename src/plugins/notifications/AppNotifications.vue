<template>
  <v-dialog
      v-model="show"
      width="500"
      persistent
      offset-y
      offset-x
      content-class="app--progress"
      transition="fade-transition"
    >
      <v-card>
        <v-container>
          <v-row
            no-gutters
            style="height: 40px; overflow: hidden"
            >
            <v-col cols="11">
              <v-alert
                dense
                color="info"
                border="left"
                colored-border
                text
                class="font--size"
                type="info"
              >
                Nuevo frontend base utilizando la ultima version de vuetify 2.2
              </v-alert>
            </v-col>
            <v-col cols="1" align="end">
              <v-tooltip bottom>
                <template v-slot:activator="{on}">
                  <v-btn small v-on="on" @click.prevent="$store.commit('CLOSE_NOTIFICATIONS')" class="mt-1" icon color="gray">
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar notificaciones</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    show: store => store.notifications.show
  })
};
</script>
<style lang="scss">
  .app--progress {
    position: fixed;
    top: 35px;
    left: 40px;
    .font--size {
      font-size: 13px;
    }
  }
</style>
