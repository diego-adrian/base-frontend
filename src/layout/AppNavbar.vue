<template>
  <v-app-bar
    app
    :clipped-left="clipped"
    fixed
    height="50"
    class="bolivia__servicio"
    :class="[auth ? 'app-navbar' : 'view--init', $store.state.layout.miniVariant ? 'isMiniVariant' : auth ? 'normalMiniVariant' : '']"
    flat
  >
    <v-app-bar-nav-icon v-if="auth" class="btn-mini-variant" @click="handleMiniVariant"></v-app-bar-nav-icon>
    <v-toolbar-title :class="[ auth ? 'black--text' : 'white--text', 'title__servicio']">BOLIVIA A TU SERVICIO : </v-toolbar-title>
    <ul class="redes__sociales">
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Facebook" @click.stop="redirect('facebook')">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Twitter" @click.stop="redirect('twitter')">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Youtube" @click.stop="redirect('youtube')">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Teléfono de contacto" @click.stop="redirect('contacto')">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Correo electrónico" @click.stop="redirect('email')">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Whatsapp" @click.stop="redirect('whatsapp')">&nbsp;</li>
      <li :style="auth ? '' : 'filter: invert(1)'" tooltip="Messenger" @click.stop="redirect('messenger')">&nbsp;</li>
    </ul>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import Auth from '@/components/auth/mixins/auth';

export default {
  mixins: [Auth],
  data: () => ({
    clipped: false,
    servicios: [
      { label: 'facebook', url: 'https://www.facebook.com/AGETIC/' },
      { label: 'twitter', url: 'https://twitter.com/AgeticBolivia' },
      { label: 'youtube', url: 'https://www.youtube.com/channel/UCEJbZkvWhboLhVBSqC_XOoQ' },
      { label: 'telefono', url: 'tel:59167176743' },
      { label: 'whatsapp', url: 'https://wa.me/59167176743?text=Hola%20Bolivia%20a%20tu%20servicio' },
      { label: 'messenger', url: 'https://m.me/AGETIC' }
    ],
    ciudadaniaDigital: [
      { title: 'Ciudadanía Digital en Bolivia', url: 'https://test.agetic.gob.bo/ciudadania/ciudadania' },
      { title: 'Trámites en Ciudadanía Digital', url: 'https://test.agetic.gob.bo/ciudadania/tramites' },
      { title: 'Servicios Digitales', url: 'https://test.agetic.gob.bo/ciudadania/servicios-digitales' },
      { title: 'Aplicaciones de Ciudadanía Digital', url: 'https://test.agetic.gob.bo/ciudadania/aplicaciones' }
    ],
    registrarse: [
      { title: 'Entidades Habilitadas', url: 'https://test.agetic.gob.bo/ciudadania/entidades' },
      { title: 'Puntos de Registro de Ciudadanía', url: 'https://test.agetic.gob.bo/ciudadania/mapa' }
    ],
    ayuda: [
      { title: '¿Cómo recupero mi contraseña?', url: 'https://test.agetic.gob.bo/ciudadania/recuperar-contrasena' },
      { title: '¿Cómo obtener la Ciudadanía Digital?', url: 'https://test.agetic.gob.bo/ciudadania/obtener-ciudadania' },
      { title: '¿Cómo activar mi cuenta de Ciudadanía?', url: 'https://test.agetic.gob.bo/ciudadania/activar-cuenta' },
      { title: 'Preguntas Frecuentes', url: 'https://test.agetic.gob.bo/ciudadania/preguntas' },
      { title: 'Videos y Tutoriales', url: 'https://test.agetic.gob.bo/ciudadania/videos' }
    ]
  }),
  methods: {
    handleMiniVariant () {
      this.$store.commit('layout/toggleMiniVariant');
      this.$store.commit('layout/toggleExpandOnHover');
    },
    goToCiudadania (url) {
      window.open(url, '_black');
    },
    redirect (key) {
      const findService = this.servicios.find(service => service.label === key);
      if (findService) {
        window.open(findService.url, '_blank');
      }
    }
  },
  computed: {
    ...mapState(['auth'])
  }
};
</script>

<style lang="scss">
@import '../scss/variables.scss';
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
      .borderWhite {
        border-left: 1px solid rgba($color: $white, $alpha: .25)
      }
      .borderBlack {
        border-left: 1px solid rgba($color: $black, $alpha: .25)
      }
      button {
        font-family: $fontFamilySansation;
        font-weight: 300;
        cursor: pointer;
        font-size: .875rem;
        &:nth-child(6) {
          height: 50px;
          margin-right: auto;
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
    width: calc(100vw);
  }
  .normalMiniVariant {
    width: calc(100vw);
  }
</style>
