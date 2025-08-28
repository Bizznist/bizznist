function includeHTML(selector, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = data;
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

// New function to inject scripts into head
function includeTracking(file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const fragment = document.createRange().createContextualFragment(data);
      document.head.appendChild(fragment);
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

document.addEventListener("DOMContentLoaded", function () {
  includeHTML("header", "/header.html");
  includeHTML("footer", "/footer.html");
  includeTracking("/tracking.html"); // <-- injects tracking code into <head>
});

