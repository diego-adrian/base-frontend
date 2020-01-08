const layout = {
  namespaced: true,
  state: {
    miniVariant: false,
    expandOnHover: false
  },
  mutations: {
    toggleMiniVariant(state) {
      state.miniVariant = !state.miniVariant;
    },
    toggleExpandOnHover(state) {
      state.expandOnHover = !state.expandOnHover;
    }
  }
};

export default layout;
