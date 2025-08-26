// Function to include external HTML files into elements with [data-include]
function includeHTML() {
  document.querySelectorAll("[data-include]").forEach(el => {
    const file = el.getAttribute("data-include");
    if (file) {
      fetch(file)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load ${file}`);
          return res.text();
        })
        .then(data => {
          el.innerHTML = data;
        })
        .catch(err => console.error(`Error loading ${file}:`, err));
    }
  });
}

// Function to inject tracking code (or any snippet) into <head>
function includeTracking(file) {
  if (!file) return;
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(data => {
      const fragment = document.createRange().createContextualFragment(data);
      document.head.appendChild(fragment);
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

// Run includes when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  includeHTML();                       // auto-load all [data-include]
  includeTracking("tracking.html");    // optional: inject tracking.html into <head>
});
