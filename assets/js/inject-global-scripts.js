document.addEventListener("DOMContentLoaded", function () {
  // Inject HEAD includes
  fetch('/assets/includes/head-includes.html')
    .then(res => res.text())
    .then(html => {
      document.head.insertAdjacentHTML('beforeend', html);
    });

  // Inject BODY includes
  fetch('/assets/includes/body-includes.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
});
