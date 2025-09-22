<script>
  document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const navToggle = document.querySelector(".mobile-nav-toggle");

    navToggle.addEventListener("click", function () {
      body.classList.toggle("mobile-nav-active");
      this.classList.toggle("bi-list");
      this.classList.toggle("bi-x");
    });

    document.querySelectorAll("#navmenu a").forEach(link => {
      link.addEventListener("click", () => {
        if (body.classList.contains("mobile-nav-active")) {
          body.classList.remove("mobile-nav-active");
          navToggle.classList.add("bi-list");
          navToggle.classList.remove("bi-x");
        }
      });
    });
  });
</script>
