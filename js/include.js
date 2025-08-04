function includeHTML(selector, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = data;
    })
    .catch(err => console.error(`Error loading ${file}:`, err));
}

document.addEventListener("DOMContentLoaded", function () {
  includeHTML("header", "/header.html");
  includeHTML("footer", "/footer.html");
});
