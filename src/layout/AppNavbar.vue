<template>
  <v-app-bar
    app
    :clipped-left="clipped"
    fixed
    height="49"
    class="bolivia__servicio"
    :class="[auth ? 'app-navbar' : 'view--init', $store.state.layout.miniVariant ? 'isMiniVariant' : auth ? 'normalMiniVariant' : '']"
    flat
  >
    <v-app-bar-nav-icon v-if="auth" class="btn-mini-variant" @click.prevent="handleMiniVariant"></v-app-bar-nav-icon>
    <v-toolbar-title :class="[ auth ? 'black--text' : 'white--text', 'title__servicio']">BOLIVIA A TU SERVICIO : </v-toolbar-title>
    <ul class="redes__sociales">
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Facebook">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Twitter">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Youtube">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Teléfono de contacto">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Correo electrónico">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Whatsapp">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Messenger">&nbsp;</li>
    </ul>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down bolivia__servicio__details">
      <!-- QUE ES CIUDADANIA DIGITAL -->
      <v-menu
        bottom
        left
        dense
        hide-overlay
        offset-y
        open-on-hover
        origin="center top"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
            :class="[auth ? 'black--text' : 'white--text', 'app--navbar__buttons']"
            style="text-transform: none"
          >
            ¿Qué es Ciudadania Digital?
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            class="items--ciudadania"
            v-for="(item, i) in ciudadaniaDigital"
            :key="i"
            @click="() => {}"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- DONDE ME REGISTRO -->
      <v-menu
        bottom
        left
        dense
        hide-overlay
        offset-y
        open-on-hover
        origin="center top"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
            :class="[auth ? 'black--text' : 'white--text', 'app--navbar__buttons']"
            style="text-transform: none"
          >
            ¿Donde me registro?
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            class="items--ciudadania"
            v-for="(item, i) in registrarse"
            :key="i"
            @click="() => {}"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- AYUDA -->
      <v-menu
        bottom
        left
        dense
        hide-overlay
        offset-y
        open-on-hover
        origin="center top"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
            :class="[auth ? 'black--text' : 'white--text', 'app--navbar__buttons']"
            style="text-transform: none"
          >
            Ayuda
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            class="items--ciudadania"
            v-for="(item, i) in ayuda"
            :key="i"
            @click="() => {}"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- APPS -->
      <section v-if="auth">
        <v-btn icon>
          <v-icon color="black">apps</v-icon>
        </v-btn>
      </section>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import Auth from '@/components/auth/mixins/auth';

export default {
  mixins: [Auth],
  data: () => ({
    clipped: false,
    ciudadaniaDigital: [
      { title: 'Ciudadania Digital en Bolivia' },
      { title: 'Tramites en Ciudadania Digital' },
      { title: 'Servicios Digitales' },
      { title: 'Aplicaciones de Ciudadania Digital' }
    ],
    registrarse: [
      { title: 'Entidades Habilitadas' },
      { title: 'Puntos de Registro de Ciudadania' }
    ],
    ayuda: [
      { title: '¿Como recupero mi contrasena?' },
      { title: '¿Como obtner la Ciudadania Digital?' },
      { title: '¿Como activar mi cuenta de Ciudadania?' },
      { title: 'Preguntas Frecuentes' },
      { title: 'Videos y Tutoriales' }
    ]
  }),
  methods: {
    handleMiniVariant () {
      this.$store.commit('layout/toggleMiniVariant');
      this.$store.commit('layout/toggleExpandOnHover');
    }
  },
  computed: {
    ...mapState(['auth'])
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
$bgNabvar: rgba($color: darken($primary, 35%), $alpha: .75);
.view--init {
  background: transparent !important;
  border-bottom: 1px solid rgba($color: $white, $alpha: .35) !important;
}
.app--navbar__buttons {
  font-family: $fontFamilySansation;
  letter-spacing: 0;
}
.items--ciudadania {
  .v-list-item__title {
    font-family: $fontFamilySansation;
    letter-spacing: 0;
    font-size: .8rem;
  }
}
.app-navbar {
  width: auto;
  border-bottom: 1px solid rgba($color: $black, $alpha: .2) !important;
  .v-app-bar__content {
    padding: 0 15px;
  }

  .btn-mini-variant {
    display: inline-block;
  }
  .btn-drawer {
    display: none;
  }

}

.btn-fullscreen {
  .v-icon:last-child {
    display: none;
  }
}

body.fullscreen {
  .btn-fullscreen {
    .v-icon:first-child {
      display: none;
    }
    .v-icon:last-child {
      display: inline-block;
    }
  }
}

.bolivia__servicio {
    width: 100%;
    padding: 0;
    margin: 0;
    .title__servicio {
      text-transform: uppercase;
      font-family: $fontFamilySansation;
      font-weight: 300;
      line-height: 50px;
      font-size: .75rem;
      user-select: none;
    }
    .bolivia__servicio__details {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      section {
        font-family: $fontFamilySansation;
        font-weight: 300;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        font-size: .875rem;
        margin-right: 20px;
        &:nth-child(4) {
          height: 50px;
          margin-right: auto;
          border-left: 1px solid rgba($color: $black, $alpha: .2);
        }
      }

    }
    .redes__sociales {
      list-style: none;
      display: flex;
      flex-direction: row;
      li {
        align-self: center;
        margin-right: 2px;
        cursor: pointer;
        &:nth-child(1) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/facebook.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            padding: 5px;
            max-width: 100px;
            color: $white;
            font-size: 12px;
            position: absolute;
            background: $black;
            top: 45px;
          }
        }
        &:nth-child(2) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/twitter.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            padding: 5px;
            max-width: 100px;
            color: $white;
            font-size: 12px;
            position: absolute;
            background: $black;
            top: 45px;
          }
        }
        &:nth-child(3) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/youtube.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            padding: 5px;
            max-width: 100px;
            color: $white;
            font-size: 12px;
            position: absolute;
            background: $black;
            top: 45px;
          }
        }
        &:nth-child(4) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/phone.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            padding: 5px;
            max-width: 150px;
            width: 130px;
            color: $white;
            font-size: 12px;
            position: absolute;
            background: $black;
            top: 45px;
          }
        }
        &:nth-child(5) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/email.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            padding: 5px;
            max-width: 150px;
            width: 120px;
            color: $white;
            font-size: 12px;
            position: absolute;
            background: $black;
            top: 45px;
          }
        }
        &:nth-child(6) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/whatsapp.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            padding: 5px;
            max-width: 100px;
            color: $white;
            font-size: 12px;
            position: absolute;
            background: $black;
            top: 45px;
          }
        }
        &:nth-child(7) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/messenger.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            padding: 5px;
            max-width: 100px;
            color: $white;
            font-size: 12px;
            position: absolute;
            background: $black;
            top: 45px;
          }
        }
      }
    }
  }
  .isMiniVariant {
    width: calc(100vw - 56px);
  }
  .normalMiniVariant {
    width: calc(100vw - 300px);
  }
</style>
