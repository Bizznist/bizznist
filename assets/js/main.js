document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  if (!mobileNavToggleBtn) {
    console.warn("mobile-nav-toggle button not found");
    return;
  }

  mobileNavToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  // Close mobile nav when any nav link is clicked
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        document.body.classList.remove('mobile-nav-active');
        mobileNavToggleBtn.classList.add('bi-list');
        mobileNavToggleBtn.classList.remove('bi-x');
      }
    });
  });

  // Dropdown toggle for items like “Services”
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const parentLi = this.closest('li');
      if (!parentLi) return;
      parentLi.classList.toggle('active');
      const submenu = parentLi.querySelector('ul');
      if (submenu) submenu.classList.toggle('dropdown-active');
    });
  });

});
