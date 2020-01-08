<template>
  <div>
    <v-bottom-sheet
      v-model="show"
      inset
      content-class="bottom--sheet"
      transition="scale-transition"
      persistent>
      <v-sheet
        scrollable
        class="text-center"
        :height="'50vh'"
      >
        <v-list>
          <template v-for="(notificacion, index) in notificaciones">
            <v-subheader
              v-if="notificacion.header"
              :key="notificacion.header"
            >
              {{ notificacion.header }}
            </v-subheader>

            <v-divider
              v-else-if="notificacion.divider"
              :key="index"
              :inset="notificacion.inset"
            ></v-divider>

            <v-list-item
              v-else
              :key="notificacion.title"
              @click=""
            >
              <v-list-item-avatar>
                <v-img :src="notificacion.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="notificacion.title"></v-list-item-title>
                <v-list-item-subtitle v-html="notificacion.subtitle"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
      </v-list>

        <v-btn
          class="mt-6"
          color="error"
          outlined
          @click="$store.commit('CLOSE_NOTIFICATIONS')"
        >Cerrar notificaciones</v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    messages: true,
    notificaciones: [
      { header: 'Notificaciones' },
      {
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        title: 'Mensaje número 1',
        subtitle: 'Es el ejercicio de tus derechos y deberes en el mundo digital. Ciudadanía Digital es acercar el Estado a las y los ciudadanos en el mundo digital, para que a través Internet puedan acceder a los servicios de las entidades públicas y garantizar sus derechos en el mundo digital.',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
        title: 'Mensaje número 2',
        subtitle: 'Es el ejercicio de tus derechos y deberes en el mundo digital. Ciudadanía Digital es acercar el Estado a las y los ciudadanos en el mundo digital, para que a través Internet puedan acceder a los servicios de las entidades públicas y garantizar sus derechos en el mundo digital.',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
        title: 'Mensaje número 3',
        subtitle: 'Es el ejercicio de tus derechos y deberes en el mundo digital. Ciudadanía Digital es acercar el Estado a las y los ciudadanos en el mundo digital, para que a través Internet puedan acceder a los servicios de las entidades públicas y garantizar sus derechos en el mundo digital.',
      },
      { divider: true, inset: true },
      {
        avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
        title: 'Mensaje número 4',
        subtitle: 'Es el ejercicio de tus derechos y deberes en el mundo digital. Ciudadanía Digital es acercar el Estado a las y los ciudadanos en el mundo digital, para que a través Internet puedan acceder a los servicios de las entidades públicas y garantizar sus derechos en el mundo digital.',
      }
    ]
  }),
  computed: mapState({
    show: store => store.notifications.show
  })
};
</script>
<style lang="scss">
</style>
