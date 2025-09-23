document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded");

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  if (!mobileNavToggleBtn) {
    console.warn("❌ mobile-nav-toggle not found");
    return;
  }

  console.log("✅ Found mobileNavToggleBtn:", mobileNavToggleBtn);

  mobileNavToggleBtn.addEventListener('click', function () {
    console.log("✅ Toggle button clicked");
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
