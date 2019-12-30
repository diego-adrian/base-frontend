import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify, {
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VMenu,
  VToolbar,
  VDialog,
  VAvatar,
  VDivider,
  VTooltip,
  VForm,
  VTextField,
  VRadioGroup,
  VCheckbox,
  VSelect,
  VAutocomplete,
  VCombobox,
  VTextarea,
  VChip,
  VSwitch,
  VDataTable,
  VCard,
  VBreadcrumbs,
  VAlert,
  VTabs,
  VDatePicker,
  VTimePicker,
  VStepper,
  VSubheader,
  VProgressCircular,
  VExpansionPanel,
  VOverflowBtn,
  VBadge,
  VTimeline,
  VPagination,
  VSpeedDial,
  VTreeview,
  VProgressLinear,
  VBtnToggle,
  VItemGroup,
  VSnackbar
} from 'vuetify/lib';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VMenu,
    VToolbar,
    VDialog,
    VAvatar,
    VDivider,
    VTooltip,
    VForm,
    VTextField,
    VRadioGroup,
    VCheckbox,
    VSelect,
    VAutocomplete,
    VCombobox,
    VTextarea,
    VChip,
    VSwitch,
    VDataTable,
    VCard,
    VBreadcrumbs,
    VAlert,
    VTabs,
    VDatePicker,
    VTimePicker,
    VStepper,
    VProgressCircular,
    VSubheader,
    VExpansionPanel,
    VOverflowBtn,
    VBadge,
    VTimeline,
    VPagination,
    VSpeedDial,
    VTreeview,
    VProgressLinear,
    VBtnToggle,
    VItemGroup,
    VSnackbar
  }
});

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#0250c5',
        secondary: '#dd215c',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      },
      dark: {
        primary: '#0250c5',
        secondary: '#dd215c',
        accent: '#82B1FF',
        info: '#1680c2',
        warning: '#f9c100',
        error: '#d31419',
        success: '#449935'
      }
    }
  }
});
