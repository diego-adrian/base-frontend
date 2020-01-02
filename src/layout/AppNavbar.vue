<template>
  <v-app-bar
    app
    :clipped-left="clipped"
    fixed
    height="58"
    class="bolivia__servicio"
    :class="auth ? 'app-navbar white white--text' : 'view--init white--text'"
    :style="auth ? '' : 'box-shadow: none'"
  >
    <v-app-bar-nav-icon v-if="auth" class="btn-mini-variant" @click.stop="$store.commit('layout/toggleMiniVariant')"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon v-if="auth" class="btn-drawer" @click.stop="$store.commit('layout/toggleDrawer')"></v-app-bar-nav-icon>
    <v-toolbar-title class="title__servicio">BOLIVIA A TU SERVICIO </v-toolbar-title>
    <ul class="redes__sociales">
      <li tooltip="Facebook">&nbsp;</li>
      <li tooltip="Twitter">&nbsp;</li>
      <li tooltip="Youtube">&nbsp;</li>
      <li tooltip="Teléfono de contacto">&nbsp;</li>
      <li tooltip="Correo electrónico">&nbsp;</li>
      <li tooltip="Whatsapp">&nbsp;</li>
      <li tooltip="Messenger">&nbsp;</li>
    </ul>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down bolivia__servicio__details">
      <section>¿Qué es Empresa Digital?</section>
      <section>Trámites Disponibles</section>
      <section>Ayuda</section>
      <section>
        <v-btn icon>
          <v-icon color="white">apps</v-icon>
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
    clipped: false
  }),
  computed: {
    ...mapState(['auth'])
  }
};
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';
.view--init {
  background: transparent !important;
  border-bottom: 1px solid rgba($color: $white, $alpha: .1) !important;
}
.app-navbar {

  .v-app-bar__content {
    padding: 0 15px;
  }

  .v-btn .v-icon {
    color: $color;
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
      font-weight: 300;
      line-height: 50px;
      font-size: .8rem;
      font-family: $fontFamilySansation;
      color: $white;
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
        font-size: 14px;
        color: $white;
        margin-right: 20px;
        &:nth-child(4) {
          height: 50px;
          margin-right: auto;
          border-left: 1px solid rgba($color: $white, $alpha: .2);
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
        opacity: .85;
        filter: invert(1);
        &:nth-child(1) {
          width: 32px;
          height: 32px;
          background: url('../../public/img/facebook.svg') no-repeat;
          background-size: contain;
          background-position: center;
          &:hover::before {
            content: attr(tooltip);
            font-family: $fontFamilySansation;
            padding: 5px;
            max-width: 100px;
            color: $white;
            background: rgba($color: $black, $alpha: 1);
            font-size: 12px;
            position: absolute;
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
            font-family: $fontFamilySansation;
            padding: 5px;
            max-width: 100px;
            color: $white;
            background: rgba($color: $black, $alpha: 1);
            font-size: 12px;
            position: absolute;
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
            font-family: $fontFamilySansation;
            padding: 5px;
            max-width: 100px;
            color: $white;
            background: rgba($color: $black, $alpha: 1);
            font-size: 12px;
            position: absolute;
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
            font-family: $fontFamilySansation;
            padding: 5px;
            max-width: 150px;
            width: 130px;
            color: $white;
            background: rgba($color: $black, $alpha: 1);
            font-size: 12px;
            position: absolute;
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
            font-family: $fontFamilySansation;
            padding: 5px;
            max-width: 150px;
            width: 110px;
            color: $white;
            background: rgba($color: $black, $alpha: 1);
            font-size: 12px;
            position: absolute;
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
            font-family: $fontFamilySansation;
            padding: 5px;
            max-width: 100px;
            color: $white;
            background: rgba($color: $black, $alpha: 1);
            font-size: 12px;
            position: absolute;
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
            font-family: $fontFamilySansation;
            padding: 5px;
            max-width: 100px;
            color: $white;
            background: rgba($color: $black, $alpha: 1);
            font-size: 12px;
            position: absolute;
            top: 45px;
          }
        }
      }
    }
  }

@media (max-width: 1256px) {
  .app-navbar {
    .btn-mini-variant {
      display: none;
    }
    .btn-drawer {
      display: inline-block;
    }
  }
}
</style>
