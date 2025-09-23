document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded");

  function waitForElement(selector, callback, interval = 100, timeout = 5000) {
    const start = Date.now();
    const timer = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(timer);
        callback(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(timer);
        console.warn(`⏱️ Timeout: ${selector} not found after ${timeout}ms`);
      }
    }, interval);
  }

  waitForElement('.mobile-nav-toggle', function (mobileNavToggleBtn) {
    console.log("✅ Found toggle after wait:", mobileNavToggleBtn);

    mobileNavToggleBtn.addEventListener('click', function () {
      console.log("✅ Toggle clicked");
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          document.body.classList.remove('mobile-nav-active');
          mobileNavToggleBtn.classList.add('bi-list');
          mobileNavToggleBtn.classList.remove('bi-x');
        }
      });
    });

    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const parentLi = this.closest('li');
        const submenu = parentLi.querySelector('ul');
        parentLi.classList.toggle('active');
        if (submenu) submenu.classList.toggle('dropdown-active');
      });
    });
  });

});
