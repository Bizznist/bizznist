document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const navToggle = document.querySelector(".mobile-nav-toggle");

    if (navToggle) {
      navToggle.addEventListener("click", function () {
        body.classList.toggle("mobile-nav-active");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
      });
    }

    // Close mobile nav when any menu link is clicked
    document.querySelectorAll("#navmenu a").forEach(link => {
      link.addEventListener("click", () => {
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          if (navToggle) {
            navToggle.classList.add("bi-list");
            navToggle.classList.remove("bi-x");
          }
        }
      });
    });

    // Handle dropdown toggles in mobile nav
    document.querySelectorAll(".navmenu .toggle-dropdown").forEach(dropdownToggle => {
      dropdownToggle.addEventListener("click", function (e) {
        e.preventDefault();
        const parent = this.closest("li");
        if (parent) {
          parent.classList.toggle("active");
          const submenu = parent.querySelector("ul");
          if (submenu) {
            submenu.classList.toggle("dropdown-active");
          }
        }
      });
    });
  });
