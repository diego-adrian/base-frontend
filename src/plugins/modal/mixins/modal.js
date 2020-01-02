export default {
  methods: {
    bloquear (e) {
      // 46 - Delete
      // 8 - Backspace
      // 9 - Tab
      // 27 - Escape
      // 13 - Enter
      const code = e.keyCode || e.charCode;
      if ([27, 9, 13].indexOf(code) !== -1) {
        const btnCancel = document.querySelector('#md-btn-confirm-selected-cancel');
        const btnOk = document.querySelector('#md-btn-confirm-selected-ok');
        const select = document.activeElement;
        if (code === 9) {
          if (select.id !== 'md-btn-confirm-selected-cancel') {
            setTimeout(() => {
              btnOk.classList.remove('md-focused');
              btnCancel.classList.add('md-focused');
              btnCancel.focus();
            }, 10);
          } else {
            setTimeout(() => {
              btnCancel.classList.remove('md-focused');
              btnOk.classList.add('md-focused');
              btnOk.focus();
            }, 10);
          }
        }
        if (code === 27) {
          btnCancel.click();
        }
        if (code === 13) {
          if (select.id === 'md-btn-confirm-selected-ok') {
            btnOk.click();
          } else if (select.id === 'md-btn-confirm-selected-cancel') {
            btnCancel.click();
          } else {
            e.preventDefault();
          }
        }
        return false;
      }
      e.preventDefault();
    }
  }
};
