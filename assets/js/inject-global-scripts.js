// inject-global-scripts.js
document.addEventListener("DOMContentLoaded", () => {
  // Inject <head> includes
  fetch("/assets/includes/head-includes.html")
    .then(response => response.text())
    .then(content => {
      const fragment = document.createRange().createContextualFragment(content);
      document.head.appendChild(fragment);
    });

  // Inject <body> includes (before </body>)
  fetch("/assets/includes/body-includes.html")
    .then(response => response.text())
    .then(content => {
      const fragment = document.createRange().createContextualFragment(content);
      document.body.appendChild(fragment);
    });
});
