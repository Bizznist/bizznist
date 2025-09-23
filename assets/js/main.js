document.addEventListener('DOMContentLoaded', function () {
  "use strict";

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', () => {
      console.log("Hamburger clicked"); // Test log
      mobileNavToggle();
    });
  } else {
    console.warn('Hamburger icon (.mobile-nav-toggle) not found');
  }

  // Optional: auto-close mobile nav on link click
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

});
