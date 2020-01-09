<template>
  <v-dialog
      v-model="show"
      width="500"
      persistent
      offset-y
      offset-x
      content-class="app--progress"
      transition="scale-transition"
    >
      <v-card>
        <v-container fluid>
          <v-row justify="center">
            <v-subheader>Today</v-subheader>

            <v-expansion-panels inset>
              <v-expansion-panel
                v-for="(message, i) in messages"
                :key="i"
                hide-actions
              >
                <v-expansion-panel-header>
                  <v-row
                    align="center"
                    class="spacer"
                    no-gutters
                  >
                    <v-col
                      cols="4"
                      sm="2"
                      md="1"
                    >
                      <v-avatar
                        size="36px"
                      >
                        <img
                          v-if="message.avatar"
                          alt="Avatar"
                          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                        >
                        <v-icon
                          v-else
                          :color="message.color"
                          v-text="message.icon"
                        ></v-icon>
                      </v-avatar>
                    </v-col>

                    <v-col
                      class="hidden-xs-only"
                      sm="5"
                      md="3"
                    >
                      <strong v-html="message.name"></strong>
                      <span
                        v-if="message.total"
                        class="grey--text"
                      >
                        &nbsp;({{ message.total }})
                      </span>
                    </v-col>

                    <v-col
                      class="text-no-wrap"
                      cols="5"
                      sm="3"
                    >
                      <v-chip
                        v-if="message.new"
                        :color="`${message.color} lighten-4`"
                        class="ml-0"
                        label
                        small
                      >
                        {{ message.new }} new
                      </v-chip>
                      <strong v-html="message.title"></strong>
                    </v-col>

                    <v-col
                      v-if="message.excerpt"
                      class="grey--text text-truncate hidden-sm-and-down"
                    >
                      &mdash;
                      {{ message.excerpt }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>
                  <v-divider></v-divider>
                  <v-card-text v-text="lorem"></v-card-text>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    messages: [
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...',
      },
      {
        color: 'red',
        icon: 'people',
        name: 'Social',
        new: 1,
        total: 3,
        title: 'Twitter',
      },
      {
        color: 'teal',
        icon: 'local_offer',
        name: 'Promos',
        new: 2,
        total: 4,
        title: 'Shop your way',
        exceprt: 'New deals available, Join Today',
      },
    ],
    lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
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
  .app--progress {
    position: fixed;
    top: 0;
    right: 0;
  }
</style>
