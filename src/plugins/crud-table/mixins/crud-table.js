export default {
  methods: {
    updateList(id = 'btn-refresh-list') {
      if (document.getElementById(id)) {
        document.getElementById(id).dispatchEvent(new window.Event('click', { cancelable: true }));
      }
    }
  }
};
